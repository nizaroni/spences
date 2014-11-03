var prefix;

prefix = require('./redis-key-prefix');

function expenseKey (id) {
    return prefix() + 'expense:' + id;
}

module.exports = expenseKey;
