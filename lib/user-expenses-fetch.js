var userExpensesKey, db;

userExpensesKey = require('./user-expenses-key');
db = require('./db');

function userExpensesFetch (userId, callback) {
    db.zrevrange(userExpensesKey(userId), 0, -1, function fetchHashes (err, expensesKeys) {
        var multi;

        if (err) {
            callback(err);
            return;
        }

        multi = db.multi();

        expensesKeys.forEach(function fetchHash (hashKey) {
            multi.hgetall(hashKey);
        });

        multi.exec(function (err, rawExpenses) {
            var expenses;

            if (err) {
                callback(err);
                return;
            }

            expenses = rawExpenses.map(function (expense) {
                expense.id = +expense.id;
                expense.user = +expense.user;
                expense.datetime = +expense.datetime;
                expense.amount = +expense.amount;
                return expense;
            });

            callback(null, expenses);
        });
    });
}

module.exports = userExpensesFetch;
