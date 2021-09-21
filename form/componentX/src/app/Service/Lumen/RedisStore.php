<?php

namespace App\Service\Lumen;

use App\Service\Utils;
use Illuminate\Cache\RedisLock;
use Illuminate\Cache\RedisTaggedCache;
use Illuminate\Cache\TagSet;
use Illuminate\Contracts\Redis\Factory as Redis;

class RedisStore extends \Illuminate\Cache\RedisStore {
    /**
     * The Redis factory implementation.
     *
     * @var \Illuminate\Contracts\Redis\Factory
     */
    protected $redis;

    /**
     * A string that should be prepended to keys.
     *
     * @var string
     */
    protected $prefix;

    /**
     * The Redis connection that should be used.
     *
     * @var string
     */
    protected $connection;

    /**
     * Create a new Redis store.
     *
     * @param  \Illuminate\Contracts\Redis\Factory  $redis
     * @param  string  $prefix
     * @param  string  $connection
     * @return void
     */
    public function __construct(Redis $redis, $prefix = '', $connection = 'default')
    {
        $this->redis = $redis;
        $this->setPrefix($prefix);
        $this->setConnection($connection);
    }

    /**
     * Retrieve an item from the cache by key.
     *
     * @param  string|array  $key
     * @return mixed
     */
    public function get($key)
    {
        return $this->_execute(function ($connection) use ($key) {
            $value = $connection->get($this->prefix.$key);
            return ! is_null($value) ? $this->unserialize($value) : null;
        });
    }


    /**
     * Retrieve multiple items from the cache by key.
     *
     * Items not found in the cache will have a null value.
     *
     * @param  array  $keys
     * @return array
     */
    public function many(array $keys) {
        return $this->_execute(function ($connection) use ($keys) {
            $results = [];

            $values = $connection->mget(array_map(function ($key) {
                return $this->prefix.$key;
            }, $keys));

            foreach ($values as $index => $value) {
                $results[$keys[$index]] = ! is_null($value) ? $this->unserialize($value) : null;
            }

            return $results;
        });
    }

    /**
     * Store an item in the cache for a given number of seconds.
     *
     * @param  string  $key
     * @param  mixed  $value
     * @param  int  $seconds
     * @return bool
     */
    public function put($key, $value, $seconds)
    {
        return $this->_execute(function ($connection) use ($key, $value, $seconds) {
            return (bool) $connection->setex(
                $this->prefix.$key, (int) max(1, $seconds), $this->serialize($value)
            );
        });
    }

    /**
     * Store multiple items in the cache for a given number of seconds.
     *
     * @param  array  $values
     * @param  int  $seconds
     * @return bool
     */
    public function putMany(array $values, $seconds)
    {
        return $this->_execute(function ($connection) use ($values, $seconds) {
            $connection->multi();

            $manyResult = null;

            foreach ($values as $key => $value) {
                $result = $this->put($key, $value, $seconds);

                $manyResult = is_null($manyResult) ? $result : $result && $manyResult;
            }

            $connection->exec();

            return $manyResult ?: false;
        });
    }

    /**
     * Store an item in the cache if the key doesn't exist.
     *
     * @param  string  $key
     * @param  mixed  $value
     * @param  int  $seconds
     * @return bool
     */
    public function add($key, $value, $seconds)
    {
        return $this->_execute(function ($connection) use ($key, $value, $seconds) {
            $lua = "return redis.call('exists',KEYS[1])<1 and redis.call('setex',KEYS[1],ARGV[2],ARGV[1])";

            return (bool) $connection->eval(
                $lua, 1, $this->prefix.$key, $this->serialize($value), (int) max(1, $seconds)
            );
        });
    }

    /**
     * Increment the value of an item in the cache.
     *
     * @param  string  $key
     * @param  mixed  $value
     * @return int
     */
    public function increment($key, $value = 1)
    {
        return $this->_execute(function ($connection) use ($key, $value) {
            return $connection->incrby($this->prefix.$key, $value);
        });
    }

    /**
     * Decrement the value of an item in the cache.
     *
     * @param  string  $key
     * @param  mixed  $value
     * @return int
     */
    public function decrement($key, $value = 1)
    {
        return $this->_execute(function ($connection) use ($key, $value) {
            return $connection->decrby($this->prefix.$key, $value);
        });
    }

    /**
     * Store an item in the cache indefinitely.
     *
     * @param  string  $key
     * @param  mixed  $value
     * @return bool
     */
    public function forever($key, $value)
    {
        return $this->_execute(function ($connection) use ($key, $value) {
            return (bool) $connection->set($this->prefix.$key, $this->serialize($value));
        });
    }

    /**
     * Get a lock instance.
     *
     * @param  string  $name
     * @param  int  $seconds
     * @param  string|null  $owner
     * @return \Illuminate\Contracts\Cache\Lock
     */
    public function lock($name, $seconds = 0, $owner = null)
    {
        return $this->_execute(function ($connection) use ($name, $seconds, $owner) {
            return new RedisLock($connection, $this->prefix.$name, $seconds, $owner);
        });
    }

    /**
     * Restore a lock instance using the owner identifier.
     *
     * @param  string  $name
     * @param  string  $owner
     * @return \Illuminate\Contracts\Cache\Lock
     */
    public function restoreLock($name, $owner)
    {
        return $this->lock($name, 0, $owner);
    }

    /**
     * Remove an item from the cache.
     *
     * @param  string  $key
     * @return bool
     */
    public function forget($key)
    {
        return $this->_execute(function ($connection) use ($key) {
            return (bool) $connection->del($this->prefix.$key);
        });
    }

    /**
     * Remove all items from the cache.
     *
     * @return bool
     */
    public function flush()
    {
        return $this->_execute(function ($connection) {
            $connection->flushdb();
            return true;
        });
    }

    /**
     * Begin executing a new tags operation.
     *
     * @param  array|mixed  $names
     * @return \Illuminate\Cache\RedisTaggedCache
     */
    public function tags($names)
    {
        return new RedisTaggedCache(
            $this, new TagSet($this, is_array($names) ? $names : func_get_args())
        );
    }

    /**
     * Get the Redis connection instance.
     *
     * @return \Illuminate\Redis\Connections\Connection
     */
    public function connection()
    {
        return $this->redis->connection($this->connection);
    }

    /**
     * Set the connection name to be used.
     *
     * @param  string  $connection
     * @return void
     */
    public function setConnection($connection)
    {
        $this->connection = $connection;
    }

    /**
     * Get the Redis database instance.
     *
     * @return \Illuminate\Contracts\Redis\Factory
     */
    public function getRedis()
    {
        return $this->redis;
    }

    /**
     * Get the cache key prefix.
     *
     * @return string
     */
    public function getPrefix()
    {
        return $this->prefix;
    }

    /**
     * Set the cache key prefix.
     *
     * @param  string  $prefix
     * @return void
     */
    public function setPrefix($prefix)
    {
        $this->prefix = ! empty($prefix) ? $prefix.':' : '';
    }

    /**
     * Serialize the value.
     *
     * @param  mixed  $value
     * @return mixed
     */
    protected function serialize($value)
    {
        return is_numeric($value) && ! in_array($value, [INF, -INF]) && ! is_nan($value) ? $value : serialize($value);
    }

    /**
     * Unserialize the value.
     *
     * @param  mixed  $value
     * @return mixed
     */
    protected function unserialize($value)
    {
        return is_numeric($value) ? $value : unserialize($value);
    }

    private function _execute(callable $callback) {
        $connection = $this->connection();
        $result = $callback($connection);
        if (Utils::isCoroutineEnabled()) {
            app()->get('connection_pool')->getPool('redis')->return($connection);
        }
        return $result;
    }
}
