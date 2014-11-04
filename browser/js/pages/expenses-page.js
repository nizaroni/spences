var AmpersandView,
    expensesCollection, ExpenseItemView, expensesEmpty, expensesTable,
    ExpensesPage
;

AmpersandView = require('ampersand-view');

expensesCollection = require('../models/expenses-collection');
ExpenseItemView = require('../views/expense-item-view');
expensesEmpty = require('../../templates/pages/expenses-empty.dom');
expensesTable = require('../../templates/pages/expenses-table.dom');

ExpensesPage = AmpersandView.extend({
    template: expensesTable,

    authOnly: true,

    events: {
        'keyup [data-hook~=expense-search]': 'filterExpenses'
    },

    render: function () {
        this.renderWithTemplate();
        this.renderCollection(expensesCollection, ExpenseItemView, this.queryByHook('expenses-list'));
        if (!expensesCollection.length) {
            expensesCollection.fetch();
        }
    },

    filterExpenses: function (event) {
        var searchInput, filtered;

        if (this.isFiltering) {
            return;
        }

        if (!this.allExpenses) {
            this.allExpenses = expensesCollection.models.slice();
        }

        searchInput = event.target.value.toLowerCase();

        if (!searchInput) {
            expensesCollection.set(this.allExpenses);
            return;
        }

        this.isFiltering = true;
        filtered = this.allExpenses.filter(function searchExpenses (expense) {
            var stringAmount;

            stringAmount = '' + expense.prettyAmount;
            return stringAmount.indexOf(searchInput) > -1
                || expense.date.indexOf(searchInput) > -1
                || expense.time.indexOf(searchInput) > -1
                || expense.description.toLowerCase().indexOf(searchInput) > -1
                || expense.comments.toLowerCase().indexOf(searchInput) > -1
            ;
        });

        expensesCollection.set(filtered);

        this.isFiltering = false;
    }
});

module.exports = ExpensesPage;
