var AmpersandView, expensesAdd, ExpenseForm, ExpensesAddPage;

AmpersandView = require('ampersand-view');

expensesAdd = require('../../templates/pages/expenses-add.dom');
ExpenseForm = require('../forms/expense-form');

ExpensesAddPage = AmpersandView.extend({
    pageTitle: 'Add an expense | Spences',

    template: expensesAdd,

    subviews: {
        form: {
            hook: 'expense-form',
            prepareView: function (el) {
                var expenseForm;

                expenseForm = new ExpenseForm({
                    el: el,
                    submitCallback: function () {
                        console.log('Submit!');
                    }
                });

                return expenseForm;
            }
        }
    }
});

module.exports = ExpensesAddPage;
