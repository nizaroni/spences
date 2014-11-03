var prefix, db;

prefix = require('./redis-key-prefix');
db = require('./db');


function expenseNewId (callback) {
    db.incr(prefix() + 'state:expenses:ids', callback);
}

module.exports = expenseNewId;
