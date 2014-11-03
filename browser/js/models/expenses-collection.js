var AmpersandRestCollection, ExpenseModel, ExpensesCollection;

AmpersandRestCollection = require('ampersand-rest-collection');

ExpenseModel = require('./expense-model');

ExpensesCollection = AmpersandRestCollection.extend({
    model: ExpenseModel,

    url: '/api/expenses'
});

module.exports = new ExpensesCollection();
