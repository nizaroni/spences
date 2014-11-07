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
    },

    filterExpenses: function filterExpenses (query) {
        var filtered;

        if (this.isFiltering) {
            return;
        }

        if (!this.allExpenses) {
            this.allExpenses = this.models.slice();
        }

        this.filterQuery = query.toLowerCase();

        if (!query) {
            this.set(this.allExpenses);
            return;
        }

        this.isFiltering = true;
        filtered = this.allExpenses.filter(function searchExpenses (expense) {
            var stringAmount;

            stringAmount = '' + expense.prettyAmount;
            return stringAmount.indexOf(query) > -1
                || expense.date.indexOf(query) > -1
                || expense.time.indexOf(query) > -1
                || expense.description.toLowerCase().indexOf(query) > -1
                || expense.comments.toLowerCase().indexOf(query) > -1
            ;
        });

        this.set(filtered);

        this.isFiltering = false;
    }
});

module.exports = new ExpensesCollection();
