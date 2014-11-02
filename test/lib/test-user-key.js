var test, userKey;

test = require('tape');

userKey = require('../../lib/user-key');

test('userKey() test', function (t) {
    var key;

    key = userKey('alfred@batmail.com');
    t.equal(key, 'user:alfred@batmail.com');

    t.end();
});
