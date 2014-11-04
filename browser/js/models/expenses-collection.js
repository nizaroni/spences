var AmpersandRestCollection, store, ExpenseModel, ExpensesCollection;

AmpersandRestCollection = require('ampersand-rest-collection');
store = require('store');

ExpenseModel = require('./expense-model');

ExpensesCollection = AmpersandRestCollection.extend({
    model: ExpenseModel,

    url: '/api/expenses',

    ajaxConfig: function setTokenHeader () {
        var config;

        config = {};

        if (store.get('token')) {
            config.headers = {
                Authorization: 'Bearer ' + store.get('token')
            };
        }

        return config;
    }
});

module.exports = new ExpensesCollection();
