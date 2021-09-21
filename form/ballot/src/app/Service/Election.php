<?php

namespace App\Service;

use App\Service\Config\PoolConfig;
use App\Service\Cache as MemoryCache;
use App\Exceptions\LogicException;
use Illuminate;

class Election
{
    const DEFAULT_ERROR_MESSAGE = 'По техническим причинам сервис временно недоступен. Пожалуйста, попробуйте позже.';

    /** @var Config\FileConfig */
    private $_config;

    /** @var array */
    protected $logData = [];

    public function __construct()
    {
        $this->_config = PoolConfig::me()->conf('Mgik');
        $this->_SYSTEM = $this->_config->get('service/system', 'MGD');
        $this->_TOKEN = $this->_config->get('service/token', 'MGD');
        $this->_session = app()['session.store'];
    }

    /**
     * Возвращает список депутатов в округе
     * @param integer|null $district_id
     * @param bool $force
     * @return array
     * @throws LogicException
     */
    public function getDistrictDeputies(string $refStrict = null, $districtId = null, bool $force = false): array
    {
        if (!empty($refStrict)) {
            $cacheKey = 'lib|refArm|'.$refStrict;
            $ref = null;
            if (!$force) {
                $ref = MemoryCache::get($cacheKey);
            }
            if (!$ref) {
                $url = PoolConfig::me()->get('Arm')->get('serviceVoiting/ref').$refStrict;
                $ch = curl_init();

                $headers = [];
                curl_setopt($ch, CURLOPT_URL, $url);
                curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

                array_push($headers, "Content-type: application/json", "Cache-Control: no-cache", "Pragma: no-cache", "Connection: keep-alive", "accept: application/json");
                curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
                curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_ANY);
                curl_setopt($ch, CURLINFO_HEADER_OUT, 1);
                curl_setopt($ch, CURLOPT_VERBOSE, 1);
                curl_setopt($ch, CURLOPT_TIMEOUT, PoolConfig::me()->get('Arm')->get('serviceVoiting/timeout', 10));
                curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, PoolConfig::me()->get('Arm')->get('serviceVoiting/timeout', 10));
                $content = json_decode(curl_exec($ch), true);
                $httpStatus = curl_getinfo($ch, CURLINFO_HTTP_CODE);
                app()['log']->info('Deputies data loaded', ['url' => $url, 'code' => $httpStatus, 'content' => $content]);
                curl_close($ch);
                if ($httpStatus != 200 || !empty($content['error'])) {
                    throw new LogicException(self::DEFAULT_ERROR_MESSAGE.'<br/>Проблемы при загрузке справочника. '.($content['errorMessage'] ?? '').($httpStatus ? 'Код ошибки: '.$httpStatus : '').($content['error'] ? 'Ошибка: '.$content['error'] : ''));
                }
                $content = $content['result'] ?? '';
                if (!$content) {
                    throw new LogicException(self::DEFAULT_ERROR_MESSAGE.'<br/>Отсутствует справочник');
                }
                $ref = $this->formatDeputiesRef($content);
                $ref['_question'] = [];
                foreach ($content as $key => $cnt) {
                    if (!empty($cnt['name'])) {
                        $ref['_question'][$key] = $cnt['name'];
                    }
                }
                MemoryCache::setArrayForever($cacheKey, $ref);
            }
            if (!$ref) {
                throw new LogicException(self::DEFAULT_ERROR_MESSAGE.'<br/>Отсутствует справочник в кеше');
            }

            if ($districtId) {
                if (!isset($ref[$districtId])) {
                    throw new LogicException(self::DEFAULT_ERROR_MESSAGE.'<br/>У данного округа нет кандидатов.');
                }

                return $ref[$districtId];
            } else {
                return $ref;
            }
        } else {
            throw new LogicException(self::DEFAULT_ERROR_MESSAGE.'<br/>Отсутствует имя справочника для голосования');
        }
    }

    public function getDistrictQuestion(string $refStrict, $districtId, bool $force = false): string
    {
        $ref = $this->getDistrictDeputies($refStrict, null, $force);
        if (!isset($ref['_question'][$districtId])) {
            throw new LogicException(self::DEFAULT_ERROR_MESSAGE.'<br/>У данного округа нет вопроса.');
        }
        return $ref['_question'][$districtId];
    }

    /**
     * Возвращает список округов
     * @param integer|null $district_id
     * @param bool $force
     * @return array
     * @throws LogicException
     */
    public function getDistricts(string $refStrict = null, $districtId = null, bool $force = false): array
    {
        if (!empty($refStrict)) {
            $cacheKey = 'lib|refArm|'.$refStrict.'_DISTRICT';
            $ref = null;
            if (!$force) {
                $ref = MemoryCache::get($cacheKey);
            }
            if (!$ref) {
                $url = PoolConfig::me()->get('Arm')->get('serviceVoiting/ref').$refStrict.'_DISTRICT';
                $ch = curl_init();

                $headers = [];
                curl_setopt($ch, CURLOPT_URL, $url);
                curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

                array_push($headers, "Content-type: application/json", "Cache-Control: no-cache", "Pragma: no-cache", "Connection: keep-alive", "accept: application/json");
                curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
                curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_ANY);
                curl_setopt($ch, CURLINFO_HEADER_OUT, 1);
                curl_setopt($ch, CURLOPT_VERBOSE, 1);
                curl_setopt($ch, CURLOPT_TIMEOUT, PoolConfig::me()->get('Arm')->get('serviceVoiting/timeout', 10));
                curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, PoolConfig::me()->get('Arm')->get('serviceVoiting/timeout', 10));
                $content = json_decode(curl_exec($ch), true);
                $httpStatus = curl_getinfo($ch, CURLINFO_HTTP_CODE);
                app()['log']->info('District data loaded', ['url' => $url, 'code' => $httpStatus, 'content' => $content]);
                curl_close($ch);
                if ($httpStatus != 200 || !empty($content['error'])) {
                    throw new LogicException(self::DEFAULT_ERROR_MESSAGE.'<br/>Проблемы при загрузке справочника. '.($content['errorMessage'] ?? '').($httpStatus ? 'Код ошибки: '.$httpStatus : '').($content['error'] ? 'Ошибка: '.$content['error'] : ''));
                }
                $content = $content['result'] ?? '';
                if (!$content) {
                    throw new LogicException(self::DEFAULT_ERROR_MESSAGE.'<br/>Отсутствует справочник');
                }
                $ref = $this->formatDistrictsRef($content);
                MemoryCache::setArrayForever($cacheKey, $ref);
            } else {
                if (PoolConfig::me()->get('Arm')->get('needCacheDistrictLog')) {
                    app()['log']->info('District data loaded from cache', ['content' => $ref,'pid' => posix_getpid(),'sess-id' => session_id()]);
                }
            }
            if (!$ref) {
                throw new LogicException(self::DEFAULT_ERROR_MESSAGE.'<br/>Отсутствует справочник в кеше');
            }

            if ($districtId) {
                if (!isset($ref[$districtId])) {
                    throw new LogicException(self::DEFAULT_ERROR_MESSAGE.'<br/>У данного округа нет кандидатов.');
                }
                return $ref[$districtId];
            } else {
                return $ref;
            }
        } else {
            throw new LogicException(self::DEFAULT_ERROR_MESSAGE.'<br/>Отсутствует имя справочника для голосования');
        }
    }




    /**
     * Форматирует список депутатов перед сохранением в кэш
     * @param array $district_deputies
     * @return array
     */
    private function formatDeputiesRef(array $district_deputies)
    {
        $result = [];

        foreach ($district_deputies as $district_id => $deputies) {
            $result[$district_id] = [];

            if (isset($deputies['name'])) {
                unset($deputies['name']);
            }

            foreach ($deputies as $id => $deputy) {
                if (is_array($deputy) || strpos($deputy,'|')===false) {
                    $result[$district_id][$id] = $deputy;
                }
                else {
                    $parts = array_map('trim', explode('|', $deputy));

                    $result[$district_id][$id] = [
                        'id' => $parts[0] ?? '',
                        'last_name' => $parts[1] ?? '',
                        'first_name' => $parts[2] ?? '',
                        'middle_name' => $parts[3] ?? '',
                        'date' => $parts[4] ?? '',
                        'university' => $parts[5] ?? '',
                        'faculty' => $parts[6] ?? '',
                        'specialty' => $parts[7] ?? '',
                        'logo' => $parts[8] ?? '',
                        'photo' => $parts[9] ?? '',
                        'description' => $parts[10] ?? '',
                    ];
                }
            }
        }

        return $result;
    }

    /**
     * Форматирует список депутатов перед сохранением в кэш
     * @param array $district_deputies
     * @return array
     */
    private function formatDistrictsRef(array $district_deputies)
    {
        $result = [];

        foreach ($district_deputies as $district_id => $data) {
            $result[$district_id] = [];

            foreach ($data as $id => $info) {
                if (is_array($info) || strpos($info,'|')===false) {
                    $result[$district_id][$id] = $info;
                }
                else {
                    $parts = array_map('trim', explode('|', $info));

                    $result[$district_id][$id] = [
                        'name' => $parts[0] ?? '',
                        'uik' => $parts[1] ?? '',
                        'address' => $parts[2] ?? '',
                        'number' => $parts[3] ?? ''
                    ];
                }
            }
        }

        return $result;
    }
}