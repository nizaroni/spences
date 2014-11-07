var AmpersandView, moment, expensesCollection, expensesAdd, ExpenseForm, ExpensesAddPage;

AmpersandView = require('ampersand-view');
moment = require('moment');

expensesCollection = require('../models/expenses-collection');
expensesAdd = require('../../templates/pages/expenses-add.dom');
ExpenseForm = require('../forms/expense-form');

ExpensesAddPage = AmpersandView.extend({
    pageTitle: 'Add an expense | Spences',

    template: expensesAdd,

    authOnly: true,

    subviews: {
        form: {
            hook: 'expense-form',
            prepareView: function (el) {
                var expenseForm;

                expenseForm = new ExpenseForm({
                    el: el,
                    submitCallback: function (formData) {
                        var time;

                        time = moment.duration(formData.time);

                        formData.amount = formData.amount * 100;
                        formData.datetime = moment(formData.date)
                            .add(time)
                            .toDate()
                        ;

                        expensesCollection.create(formData, {
                            wait: true,
                            error: function () {
                                console.error('Server error. Show feedback.');
                            },
                            success: function (expense, response) {
                                spences.navigate('expenses');
                                expensesCollection.fetch({
                                    success: function () {
                                        expensesCollection.trigger('spences-new-expense');
                                    }
                                });
                            }
                        })
                    }
                });

                return expenseForm;
            }
        }
    }
});

module.exports = ExpensesAddPage;
