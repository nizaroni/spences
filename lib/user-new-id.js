var prefix, db;

prefix = require('./redis-key-prefix');
db = require('./db');


function userNewId (callback) {
    db.incr(prefix() + 'state:user:ids', callback);
}

module.exports = userNewId;
