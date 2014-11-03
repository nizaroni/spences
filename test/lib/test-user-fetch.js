var auto, test, userFetch, userKey, db;

auto = require('run-auto');
test = require('tape');

userFetch = require('../../lib/user-fetch');
userKey = require('../../lib/user-key');
db = require('../../lib/db');

test('userFetch() test', function (t) {
    var alfred, tasks;

    alfred = {
        id: 16,
        name: 'Alfred Pennyworth',
        email: 'alfred@batmail.com',
        passwordHash: 'masterwayne'
    };

    tasks = {};
    tasks.saveIdHash = function saveIdHash (callback) {
        db.hmset(userKey(alfred.id), alfred, callback);
    };
    tasks.saveEmailHash = function saveEmailHash (callback) {
        db.hmset(userKey(alfred.email), alfred, callback);
    };
    tasks.fetchNonExistent = function fetchNonExistent (callback) {
        userFetch({ email: 'batman@batmail.com' }, callback);
    };
    tasks.fetchById = ['saveIdHash', function fetchById (callback) {
        userFetch({ id: alfred.id }, callback);
    }];
    tasks.fetchByEmail = ['saveEmailHash', function fetchByEmail (callback) {
        userFetch({ email: alfred.email }, callback);
    }];

    auto(tasks, function (err, results) {
        if (err) {
            throw err;
        }

        t.equal(results.fetchNonExistent, null);
        t.deepEqual(results.fetchById, alfred);
        t.deepEqual(results.fetchByEmail, alfred);

        t.end();
    })

});
