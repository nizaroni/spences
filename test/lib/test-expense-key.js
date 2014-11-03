var test, expenseKey, env;

test = require('tape');

expenseKey = require('../../lib/expense-key');
env = require('../../lib/env');

test('expenseKey() test', function (t) {
    var key;

    key = expenseKey(42);
    t.equal(key, 'test:expense:42');

    env.temp({ redis_key_prefix: '' }, function () {
        key = expenseKey(42);
        t.equal(key, 'expense:42');

        t.end();
    });

});
