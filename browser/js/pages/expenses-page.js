var AmpersandView, expenses, ExpensesPage;

AmpersandView = require('ampersand-view');

expenses = require('../../templates/pages/expenses.dom');

ExpensesPage = AmpersandView.extend({
    template: expenses,

    authOnly: true
});

module.exports = ExpensesPage;
