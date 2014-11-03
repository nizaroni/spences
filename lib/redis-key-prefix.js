var env;

env = require('./env');

function prefix () {
    return env.get('redisKeyPrefix')
        ? env.get('redisKeyPrefix') + ':'
        : ''
    ;
}

module.exports = prefix;
