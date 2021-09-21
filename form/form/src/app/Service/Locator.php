<?php


namespace App\Service;

class Locator {

    public static function get($class) {
        $container = app();
        if ($container->has($class)) {
            return $container->get($class);
        }
        $instance = app()->make($class);
        $container->instance($class, $instance);
        return $instance;
    }
}