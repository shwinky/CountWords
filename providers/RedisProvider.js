const redis = require('async-redis');

class RedisProvider{
    constructor(connectionOptions) {
        this._client = redis.createClient(connectionOptions);
    }
    async add(word){
        await this._client.incr(word);
    }
    async get(word){
        return await this._client.get(word);
    }

}
module.exports = RedisProvider;