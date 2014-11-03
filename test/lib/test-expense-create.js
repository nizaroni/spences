var auto, test, userExpensesKey, expenseCreate, expenseKey, prefix, db;

auto = require('run-auto');
test = require('tape');

userExpensesKey = require('../../lib/user-expenses-key');
expenseCreate = require('../../lib/expense-create');
expenseKey = require('../../lib/expense-key');
prefix = require('../../lib/redis-key-prefix');
db = require('../../lib/db');

test('expenseCreate() test', function (t) {
    var expense, tasks;

    expense = {
        datetime: Date.now(),
        amount: 10000,
        description: 'Cleaning supplies for the Batmobile',
        comments: 'Master Wayne, might I suggest driving AROUND the swamp.',
        user: 16
    };

    tasks = {};
    tasks.fetchPreviousId = function fetchPreviousId (callback) {
        db.get(prefix() + 'state:expenses:ids', callback);
    };
    tasks.createExpense = function createExpense (callback) {
        expenseCreate(expense, callback);
    };
    tasks.fetchExpense = ['createExpense', function fetchExpense (callback, results) {
        db.hgetall(expenseKey(results.createExpense.id), callback);
    }];
    tasks.fetchFromSet = ['createExpense', function fetchFromSet (callback, results) {
        db.zrangebyscore(userExpensesKey(expense.user), expense.datetime, expense.datetime, callback);
    }];

    auto(tasks, function (err, results) {
        var createdExpense;

        if (err) {
            throw err;
        }

        results.fetchExpense.id = +results.fetchExpense.id;
        results.fetchExpense.datetime = +results.fetchExpense.datetime;
        results.fetchExpense.amount = +results.fetchExpense.amount;
        results.fetchExpense.user = +results.fetchExpense.user;
        results.fetchPreviousId = +results.fetchPreviousId;

        createdExpense = results.createExpense;

        t.equal(createdExpense.id, results.fetchPreviousId + 1);
        t.equal(createdExpense.datetime, expense.datetime);
        t.equal(createdExpense.amount, expense.amount);
        t.equal(createdExpense.description, expense.description);
        t.equal(createdExpense.comments, expense.comments);
        t.equal(createdExpense.user, expense.user);
        t.deepEqual(createdExpense, results.fetchExpense);

        t.equal(results.fetchFromSet[0], expenseKey(createdExpense.id));

        t.end();
    });
});
