var test, userExpensesKey, env;

test = require('tape');

userExpensesKey = require('../../lib/user-expenses-key');
env = require('../../lib/env');

test('userExpensesKey() test', function (t) {
    var key;

    key = userExpensesKey(16);
    t.equal(key, 'test:user:16:expenses');

    env.temp({ redis_key_prefix: '' }, function () {
        key = userExpensesKey(16);
        t.equal(key, 'user:16:expenses');

        t.end();
    });
});
