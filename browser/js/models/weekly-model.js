var AmpersandState, WeeklyModel;

AmpersandState = require('ampersand-state');

WeeklyModel = AmpersandState.extend({
    type: 'weekly',

    props: {
        name: [ 'string', true ],
        amount: [ 'number', true, 0 ],
        total: [ 'number', true, 0 ]
    },

    derived: {
        dailyAverage: {
            deps: [ 'total' ],
            fn: function () {
                if (!this.amount || !this.total) {
                    return 0;
                }
                return Math.round(this.amount / 7);
            }
        },

        prettyDailyAverage: {
            deps: [ 'dailyAverage' ],
            fn: function () {
                return this.dailyAverage / 100;
            }
        },

        prettyAmount: {
            deps: [ 'amount' ],
            fn: function () {
                return this.amount / 100;
            }
        }
    },

    add: function (addedAmount) {
        this.amount += addedAmount;
        this.total += 1;
    }
});

module.exports = WeeklyModel;
