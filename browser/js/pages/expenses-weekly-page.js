var AmpersandView, expensesCollection, expensesWeekly, ExpensesWeeklyPage;

AmpersandView = require('ampersand-view');

expensesCollection = require('../models/expenses-collection');
expensesWeekly = require('../../templates/pages/expenses-weekly.dom');

ExpensesWeeklyPage = AmpersandView.extend({
    pageTitle: 'Weekly Breakdown | Spences',

    template: expensesWeekly,

    authOnly: true,

    events: {
        'keyup [data-hook~=expense-search]': 'filterExpenses'
    },

    bindings: {
        'expenses.filterQuery': {
            type: 'attribute',
            name: 'value',
            hook: 'expense-search'
        }
    },

    expenses: expensesCollection,

    filterExpenses: function (event) {
        expensesCollection.filterExpenses(event.target.value);
    }
});

module.exports = ExpensesWeeklyPage;
