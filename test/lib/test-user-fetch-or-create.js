var hashy, auto, test, userFetchOrCreate, userKey, db;

hashy = require('hashy');
auto = require('run-auto');
test = require('tape');

userFetchOrCreate = require('../../lib/user-fetch-or-create');
userKey = require('../../lib/user-key');
db = require('../../lib/db');

test('userFetchOrCreate() test', function (t) {
    var batman, tasks, originalName;

    batman = {
        name: 'Bruce Wayne',
        email: 'bruce@batmail.com',
        password: 'batsncats'
    };

    tasks = {};
    tasks.fetchId = function fetchExisting (callback) {
        db.hget(userKey(batman.email), 'id', callback);
    };
    tasks.deletePrevious = ['fetchId', function deletePrevious (callback, results) {
        db.del(userKey(batman.email), userKey(results.fetchId), callback);
    }];
    tasks.create = ['deletePrevious', function create (callback) {
        userFetchOrCreate(batman, callback);
    }];
    tasks.fetch = ['create', function fetch (callback) {
        originalName = batman.name;
        batman.name = 'The Dark Knight';
        userFetchOrCreate(batman, callback);
    }];
    tasks.fetchFromRedis = ['create', function (callback) {
        db.hgetall(userKey(batman.email), callback);
    }];
    tasks.verifyPassword = ['create', function verifyPassword (callback, results) {
        hashy.verify(batman.password, results.create.passwordHash, callback);
    }];

    auto(tasks, function testUserFetchOrCreate (err, results) {
        if (err) {
            throw err;
        }

        results.fetchFromRedis.id = +results.fetchFromRedis.id;

        t.equal(results.create.name, originalName);
        t.equal(results.create.email, batman.email);
        t.ok(results.create.isNew);
        t.equal(results.fetch.id, results.create.id);
        t.equal(results.fetch.name, results.create.name);
        t.equal(results.fetch.email, results.create.email);
        t.equal(results.fetch.passwordHash, results.create.passwordHash);
        t.notOk(results.fetch.isNew);
        t.deepEqual(results.fetch, results.fetchFromRedis);

        t.end();
    });
});
