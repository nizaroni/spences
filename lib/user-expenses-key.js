var prefix;

prefix = require('./redis-key-prefix');

function userExpensesKey (id) {
    return prefix() + 'user:' + id + ':expenses';
}

module.exports = userExpensesKey;
