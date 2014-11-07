var AmpersandView, expensesCollection, weeklyCollection, expensesWeekly, WeeklyItemView, ExpensesWeeklyPage;

AmpersandView = require('ampersand-view');

expensesCollection = require('../models/expenses-collection');
weeklyCollection = require('../models/weekly-collection');
expensesWeekly = require('../../templates/pages/expenses-weekly.dom');
WeeklyItemView = require('../views/weekly-item-view');

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

    render: function () {
        this.renderWithTemplate();
        this.renderCollection(weeklyCollection, WeeklyItemView, this.queryByHook('weekly-list'));
        if (!expensesCollection.filterQuery && !expensesCollection.length) {
            expensesCollection.fetch();
        }
    },

    filterExpenses: function (event) {
        expensesCollection.filterExpenses(event.target.value);
    }
});

module.exports = ExpensesWeeklyPage;
