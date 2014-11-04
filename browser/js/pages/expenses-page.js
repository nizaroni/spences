var AmpersandView, expensesCollection, ExpenseItemView, expensesEmpty, expensesTable, ExpensesPage;

AmpersandView = require('ampersand-view');

expensesCollection = require('../models/expenses-collection');
ExpenseItemView = require('../views/expense-item-view');
expensesEmpty = require('../../templates/pages/expenses-empty.dom');
expensesTable = require('../../templates/pages/expenses-table.dom');

ExpensesPage = AmpersandView.extend({
    template: expensesTable,

    authOnly: true,

    render: function () {
        this.renderWithTemplate();
        this.renderCollection(expensesCollection, ExpenseItemView, this.queryByHook('expenses-list'));
        if (!expensesCollection.length) {
            expensesCollection.fetch();
        }
    }
});

module.exports = ExpensesPage;
