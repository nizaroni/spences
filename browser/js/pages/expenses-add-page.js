var AmpersandView, expensesAdd, ExpensesAddPage;

AmpersandView = require('ampersand-view');

expensesAdd = require('../../templates/pages/expenses-add.dom');

ExpensesAddPage = AmpersandView.extend({
    pageTitle: 'Add an expense | Spences',

    template: expensesAdd
});

module.exports = ExpensesAddPage;
