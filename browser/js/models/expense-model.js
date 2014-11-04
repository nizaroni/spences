var AmpersandModel, store, ExpenseModel;

AmpersandModel = require('ampersand-model');
store = require('store');

ExpenseModel = AmpersandModel.extend({
    type: 'expense',

    props: {
        id: [ 'number' ],
        user: [ 'number', true ],
        datetime: [ 'date', true ],
        amount: [ 'number', true ],
        description: [ 'string', true ],
        comments: [ 'string' ]
    },

    derived: {
        date: {
            deps: [ 'datetime' ],
            fn: function () {
                var dateParts;

                dateParts = [
                    this.datetime.getMonth() + 1,
                    this.datetime.getDate(),
                    this.datetime.getFullYear()
                ];

                return dateParts.join('/');
            }
        },
        time: {
            deps: [ 'datetime' ],
            fn: function () {
                var timeParts, minutes;

                minutes = this.datetime.getMinutes();

                if (minutes < 10) {
                    minutes = '0' + minutes;
                }

                timeParts = [
                    this.datetime.getHours(),
                    minutes
                ];

                return timeParts.join(':');
            }
        },
        prettyAmount: {
            deps: [ 'amount' ],
            fn: function () {
                return this.amount / 100;
            }
        }
    },

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

module.exports = ExpenseModel;
