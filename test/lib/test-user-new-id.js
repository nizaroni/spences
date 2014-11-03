var series, test, userNewId, prefix, db;

series = require('run-series');
test = require('tape');

userNewId = require('../../lib/user-new-id');
prefix = require('../../lib/redis-key-prefix');
db = require('../../lib/db')

test('userNewId() test', function (t) {
    function resetIds (callback) {
        db.set(prefix() + 'state:user:ids', 0, callback);
    }

    function deliverKey (callback) {
        db.get(prefix() + 'state:user:ids', callback);
    }

    var tasks = [ resetIds, userNewId, deliverKey, userNewId, deliverKey ];

    series(tasks, function (err, results) {
        if (err) {
            throw err;
        }

        t.equal(results[1], 1);
        t.equal(results[3], 2);
        t.equal(+results[2], 1);
        t.equal(+results[4], 2);

        db.quit();
        t.end();
    });
});
