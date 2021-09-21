<?php

namespace App\Component\Cache\Chain\Engine;

use App\Service\Utils;
use Illuminate;

class Database extends Base {

    private array $_fieldsMap;
    private string $_table;
    private Illuminate\Database\ConnectionInterface $_connection;

    public function __construct(string $table, array $fieldsMap) {
        $this->_table = $table;
        $this->_fieldsMap = $fieldsMap;
        $this->_connection = \DB::connection();
    }

    public function store(array $data) {
        $dbEntries = array_map([$this, '_convertToDbFieldsValues'], $data);
        if (Utils::isCoroutineEnabled()) {
            $pool = app()['connection_pool']->getPool('database');
            $connection = $pool->borrow();
            $connection->table($this->_table)->truncate();
            $connection->table($this->_table)->insert($dbEntries);
            $pool->return($connection);
            return;
        }
        $this->_connection->table($this->_table)->truncate();
        $this->_connection->table($this->_table)->insert($dbEntries);
    }

    private function _convertToDbFieldsValues(array $data): array {
        return $this->_combineFieldsWithValues($this->_fieldsMap, $data);
    }

    private function _convertFromDbFieldsValues(\stdClass $data) {
        $data = (array)$data;
        return $this->_combineFieldsWithValues(array_flip($this->_fieldsMap), $data);
    }

    private function _combineFieldsWithValues(array $fields, array $fieldsValues) {
        $result = [];
        foreach ($fieldsValues as $key => $value) {
            $field = $fields[$key] ?? null;
            if ($field === null) {
                continue;
            }
            if (is_array($value)) {
                $value = json_encode($value, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES); 
            } else if ($array = json_decode($value, true)) {
                $value = $array;
            }
            $result[$field] = $value;
        }
        return $result;
    }

    public function retrieve(): array {
        $result = $this->_connection->table($this->_table)->get('*')->all();
        return array_map([$this, '_convertFromDbFieldsValues'], $result);
    }
}
