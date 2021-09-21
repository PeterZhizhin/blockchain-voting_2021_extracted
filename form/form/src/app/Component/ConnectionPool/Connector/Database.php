<?php

namespace App\Component\ConnectionPool\Connector;

class Database extends Base {

    protected function _connect(array $config) {
        $connection = clone(\DB::connection());
        \DB::purge();
        return $connection;
    }

    public function disconnect($connection) {
        $connection->disconnect();
    }

    public function isConnected($connection): bool {
        try {
            $connection->statement('SELECT 1;');
        } catch (\Throwable $t) {
            return false;
        }
        return true;
    }

    public function reset($connection, array $config) {
    }

    public function validate($connection): bool {
        return true;
    }
}