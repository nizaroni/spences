var userExpensesKey, expenseNewId, expenseKey, db;

userExpensesKey = require('./user-expenses-key');
expenseNewId = require('./expense-new-id');
expenseKey = require('./expense-key');
db = require('./db');

function expenseCreate (expenseInfo, callback) {
    expenseNewId(function persistExpense (err, expenseId) {
        var expense, newExpenseKey, multi;

        if (err) {
            callback(err);
            return;
        }

        expense = {
            id: expenseId,
            datetime: expenseInfo.datetime,
            amount: expenseInfo.amount,
            description: expenseInfo.description,
            comments: expenseInfo.comments,
            user: expenseInfo.user
        };

        newExpenseKey = expenseKey(expense.id);

        multi = db.multi();
        multi.hmset(newExpenseKey, expense);
        multi.zadd(userExpensesKey(expense.user), expense.datetime, newExpenseKey);
        multi.exec(function deliverExpense (err) {
            if (err) {
                callback(err);
                return;
            }

            callback(null, expense);
        });
    });
}

module.exports = expenseCreate;
