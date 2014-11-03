var redis, url, env, redisUrl, client, password;

redis = require('redis');
url = require('url');

env = require('./env');

redisUrl = url.parse(env.get('redisUrl'));
client = redis.createClient(redisUrl.port, redisUrl.hostname);

if (redisUrl.auth) {
    password = redisUrl.auth.split(':')[1];
    client.auth(password);
}

module.exports = client;
