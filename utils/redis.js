const redis = require('redis');
const { promisify } = require('util');

class RedisClient {
    constructor() {
        this.client = redis.createClient();
        this.client.on('error', (err) => {
            console.error(`Redis client error: ${err}`);
        });
        
    }

    isAlive() {
        return this.client.connected;
    }

    async get(key) {
        const getAsync = promisify(this.client.get).bind(this.client);
        return getAsync(key);
    }

    async set(key, value, duration) {
        const setAsync = promisify(this.client.set).bind(this.client);
        if (duration) {
            return setAsync(key, value, 'EX', duration);
        } else {
            return setAsync(key, value);
        }
    }

    async del(key) {
        const delAsync = promisify(this.client.del).bind(this.client);
        return delAsync(key);
    }
}

const redisClient = new RedisClient();
module.exports = redisClient;
