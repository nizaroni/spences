var test, prefix, env;

test = require('tape');

prefix = require('../../lib/redis-key-prefix');
env = require('../../lib/env');

test('prefix() test', function (t) {
    t.equal(prefix(), 'test:');

    env.temp({ redis_key_prefix: '' }, function () {
        t.equal(prefix(), '');
        t.end();
    });
});
