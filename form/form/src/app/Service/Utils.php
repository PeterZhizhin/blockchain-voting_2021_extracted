<?php

namespace App\Service;

use Illuminate\Http;

class Utils {

    public static function getRouteHash(Http\Request $request) {
        // Stay classy, lumen...
        return sha1($request->route()[1]['uses']);
    }

    public static function cutTrace(\Throwable $exception) {
        return substr($exception->getTraceAsString(), 0, 600);
    }

    public static function getProcessId() {
        return getmypid();
    }

    public static function parseDistrict() {
        $result = [];
        $districts = explode(';', env('DISTRICTS', ''));
        foreach ($districts as $district) {
            $districtData = explode('=', $district);
            if (count($districtData) !== 3) {
                continue;
            }
            $result["{$districtData[0]}"] = [
                'voteStartDate' => $districtData[1],
                'title_parent_case' => $districtData[2],
            ];
        }
        return $result;
    }

    public static function getThrottleMiddleware(): array {
        $result = [];
        foreach (config('ThrottleRequests') as $key => $attempts) {
            $limitInSeconds = self::_getLimiterSecondsByConfigKey($key);
            if ($limitInSeconds === null || $attempts === null || $attempts === '-1') {
                continue;
            }
            $result[] = "throttle:{$attempts},{$limitInSeconds}";
        }
        return $result;
    }

    private static function _getLimiterSecondsByConfigKey($key) {
        $map = ['rps' => 1, 'rpm' => 60];
        return $map[$key] ?? null;
    }

    public static function getActionByRequest(Http\Request $request) {
        $requestUri = $request->getRequestUri();
        $requestUriParts = explode('/', $requestUri);
        return end($requestUriParts);
    }

    public static function getApiVersionByRequest(Http\Request $request) {
        preg_match('|api\/([^\/]+)\/v([0-9\.]+)|', $request->getRequestUri(), $matches);
        return $matches[2] ?? '1';
    }

    public static function buildIndexByFunction(array $data, callable $function): array {
        $result = [];
        foreach ($data as $datum) {
            $key = $function($datum);
            $result[$key] = $datum;
        }
        return $result;
    }

    public static function isInPeriod(\DateTime $dateStart, \DateTime $dateTo): bool {
        $now = new \DateTime();
        return $now > $dateStart && $now < $dateTo;
    }

    public static function isHasBasicAccess(Http\Request $request) {
        $dateFrom = new \DateTime(env('BASIC_AUTH_FROM'));
        $dateTo = new \DateTime(env('BASIC_AUTH_TO'));
        $isInPeriod = self::isInPeriod($dateFrom, $dateTo);
        $headerToken = $request->header('TOKEN');
        $isValidTokenInHeader = $headerToken == env('BASIC_AUTH_TOKEN');
        return !$isInPeriod || $isValidTokenInHeader;
    }

    public static function isCoroutineEnabled() {
        $isCoroutineEnabled = (bool)env('SWOOLE_ENABLED', true);
        if (!$isCoroutineEnabled) {
            return false;
        }
        $res = !(app()['swoole.server']->taskworker);
        return $res;
    }

    public static function create_guid(): string {
        try {
            return sprintf('%04x%04x-%04x-%04x-%04x-%04x%04x%04x', random_int(0, 0xffff), random_int(0, 0xffff),
                random_int(0, 0xffff), random_int(0, 0x0fff) | 0x4000, random_int(0, 0x3fff) | 0x8000,
                random_int(0, 0xffff), random_int(0, 0xffff), random_int(0, 0xffff)
            );
        } catch (\Throwable $e) {
            app()['log']->error('Entropy error, generating new guid', ['exception_class' => get_class($e), 'type' => 'entropy']);
            return sprintf('%04x%04x-%04x-%04x-%04x-%04x%04x%04x', mt_rand(0, 0xffff), mt_rand(0, 0xffff),
                mt_rand(0, 0xffff), mt_rand(0, 0x0fff) | 0x4000, mt_rand(0, 0x3fff) | 0x8000,
                mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff)
            );
        }
    }
}