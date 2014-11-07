var AmpersandView, expensesWeekly, ExpensesWeeklyPage;

AmpersandView = require('ampersand-view');

expensesWeekly = require('../../templates/pages/expenses-weekly.dom');

ExpensesWeeklyPage = AmpersandView.extend({
    pageTitle: 'Weekly Breakdown | Spences',

    template: expensesWeekly
});

module.exports = ExpensesWeeklyPage;
