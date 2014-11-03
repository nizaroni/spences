var hashy, auto, test, userCreate, userKey, prefix, db;

hashy = require('hashy');
auto = require('run-auto');
test = require('tape');

userCreate = require('../../lib/user-create');
userKey = require('../../lib/user-key');
prefix = require('../../lib/redis-key-prefix');
db = require('../../lib/db');

test('userCreate() test', function (t) {
    var alfred, tasks;

    alfred = {
        name: 'Alfred Pennyworth',
        email: 'alfred@batmail.com',
        password: 'masterwayne'
    };

    tasks = {};
    tasks.fetchPreviousId = function fetchPreviousId (callback) {
        db.get(prefix() + 'state:user:ids', callback);
    };
    tasks.createUser = function createUser (callback) {
        userCreate(alfred, callback);
    };
    tasks.fetchUserByEmail = ['createUser', function fetchUserByEmail (callback) {
        db.hgetall(userKey(alfred.email), callback);
    }];
    tasks.fetchUserById = ['createUser', function fetchUserById (callback, results) {
        db.hgetall(userKey(results.createUser.id), callback);
    }];
    tasks.verifyPassword = ['createUser', function verifyPassword (callback, results) {
        hashy.verify(alfred.password, results.createUser.passwordHash, callback);
    }];

    auto(tasks, function (err, results) {
        var user;

        if (err) {
            throw err;
        }

        results.fetchUserByEmail.id = +results.fetchUserByEmail.id;
        results.fetchUserById.id = +results.fetchUserById.id;
        results.fetchPreviousId = +results.fetchPreviousId;

        user = results.createUser;

        t.equal(user.id, results.fetchPreviousId + 1);
        t.equal(user.name, alfred.name);
        t.equal(user.email, alfred.email);
        t.deepEqual(user, results.fetchUserByEmail, 'Email key hash doesn’t match!');
        t.deepEqual(user, results.fetchUserById, 'Id key hash doesn’t match!');
        t.ok(results.verifyPassword, 'Password hash doesn’t match!');

        t.end();
    });
});
