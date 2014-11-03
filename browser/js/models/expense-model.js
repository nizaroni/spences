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
                    this.datetime.getFullYear(),
                    this.datetime.getMonth() + 1,
                    this.datetime.getDate()
                ];

                return dateParts.join('-');
            }
        },
        time: {
            deps: [ 'datetime' ],
            fn: function () {
                var timeParts;

                timeParts = [
                    this.datetime.getHours(),
                    this.datetime.getMinutes()
                ];

                return timeParts.join(':');
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
