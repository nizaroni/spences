var test, userKey, env;

test = require('tape');

userKey = require('../../lib/user-key');
env = require('../../lib/env');

test('userKey() test', function (t) {
    var key;

    key = userKey('alfred@batmail.com');
    t.equal(key, 'test:user:alfred@batmail.com');

    env.temp({ redis_key_prefix: '' }, function () {
        key = userKey('alfred@batmail.com');
        t.equal(key, 'user:alfred@batmail.com');

        t.end();
    });

});
