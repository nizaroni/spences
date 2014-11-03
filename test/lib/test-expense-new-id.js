var series, test, expenseNewId, prefix, db;

series = require('run-series');
test = require('tape');

expenseNewId = require('../../lib/expense-new-id');
prefix = require('../../lib/redis-key-prefix');
db = require('../../lib/db');

test('expenseNewId() test', function (t) {
    function resetIds (callback) {
        db.set(prefix() + 'state:expenses:ids', 0, callback);
    }

    function deliverKey (callback) {
        db.get(prefix() + 'state:expenses:ids', callback);
    }

    var tasks = [ resetIds, expenseNewId, deliverKey, expenseNewId, deliverKey ];

    series(tasks, function (err, results) {
        if (err) {
            throw err;
        }

        t.equal(results[1], 1);
        t.equal(results[3], 2);
        t.equal(+results[2], 1);
        t.equal(+results[4], 2);

        t.end();
    });
});
