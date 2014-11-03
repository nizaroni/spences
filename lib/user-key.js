var prefix;

prefix = require('./redis-key-prefix');

function userKey (id) {
    return prefix() + 'user:' + id;
}

module.exports = userKey;
