<?php

namespace App\Service;

use App\Service\Config\PoolConfig;
use Illuminate\Http;

class Utils {

    public static function getActionByRequest(Http\Request $request) {
        $requestUri = $request->getRequestUri();
        $requestUriParts = explode('/', $requestUri);
        return end($requestUriParts);
    }

    public static function cutTrace(\Throwable $exception) {
        return substr($exception->getTraceAsString(), 0, 600);
    }

    public static function getApiVersionByRequest(Http\Request $request) {
        preg_match('|api\/([^\/]+)\/v([0-9\.]+)|', $request->getRequestUri(), $matches);
        return $matches[2] ?? '1';
    }

    public static function getProcessId() {
        return getmypid();
    }

    public static function isInPeriod(\DateTime $dateStart, \DateTime $dateTo): bool {
        $now = new \DateTime();
        return $now > $dateStart && $now < $dateTo;
    }

    public static function buildIndexByFunction(array $data, callable $function): array {
        $result = [];
        foreach ($data as $datum) {
            $key = $function($datum);
            $result[$key] = $datum;
        }
        return $result;
    }

    public static function throwableName(\Throwable $t) {
        $shortName = (new \ReflectionClass($t))->getShortName();
        return camel_case(strtolower($shortName));
    }

    public static function needToRenewCache($cacheKey = 'reset-cache') {
        return isset($_GET[$cacheKey]) && $_GET[$cacheKey] === PoolConfig::me()->get('My')->get('reset-cache');
	}


    public static function create_guid() {
        try {
            return sprintf('%04x%04x-%04x-%04x-%04x-%04x%04x%04x', random_int(0, 0xffff), random_int(0, 0xffff),
                random_int(0, 0xffff), random_int(0, 0x0fff) | 0x4000, random_int(0, 0x3fff) | 0x8000,
                random_int(0, 0xffff), random_int(0, 0xffff), random_int(0, 0xffff)
            );
        } catch (\Throwable $e) {
            app()['log']->error('Entropy error, generating new guid', ['type' => 'entropy_error']);
            return sprintf('%04x%04x-%04x-%04x-%04x-%04x%04x%04x', mt_rand(0, 0xffff), mt_rand(0, 0xffff),
                mt_rand(0, 0xffff), mt_rand(0, 0x0fff) | 0x4000, mt_rand(0, 0x3fff) | 0x8000,
                mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff)
            );
        }
    }

    public static function isCoroutineEnabled() {
        $isCoroutineEnabled = (bool)env('SWOOLE_ENABLED', true);
        if (!$isCoroutineEnabled) {
            return false;
        }
        $res = !(app()['swoole.server']->taskworker);
        return $res;
    }

    public function groupByFunctions(array $data, array $closures): array {
        $result = [];
        foreach ($data as $element) {
            $path = [];
            foreach ($closures as $closure) {
                $path[] = $closure($element);
            }
            $result = $this->setDataByPath($result, $path, $element);
        }
        return $result;
    }

    public function setDataByPath(array $target, array $path, $data) {
        $key = array_shift($path);
        if (!$key) return $data;
        if (!array_key_exists($key, $target)) $target[$key] = [];
        $target[$key] = $this->setDataByPath($target[$key], $path, $data);
        return $target;
    }

    public function retry(callable $closure, int $count) {
        $t = null;
        while ($count-- > 0) {
            try {
                return $closure();
            } catch (\Throwable $t) {
                app()['log']->error("Retrying, {$count} tries left", ['type' => 'retry', 'class' => get_class($t), 'message' => $t->getMessage()]);
                continue;
            }
        }
        if ($t) {
            throw $t;
        }
        return null;
    }

    public static function monthMap(): array {
        return [
            '01' => 'января',
            '02' => 'февраля',
            '03' => 'марта',
            '04' => 'апреля',
            '05' => 'мая',
            '06' => 'июня',
            '07' => 'июля',
            '08' => 'августа',
            '09' => 'сентября',
            '10' => 'октября',
            '11' => 'ноября',
            '12' => 'декабря'
        ];
    }
}
