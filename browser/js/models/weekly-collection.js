var AmpersandCollection, groupBy, moment, expensesCollection, WeeklyModel, WeeklyCollection;

AmpersandCollection = require('ampersand-collection');
groupBy = require('lodash.groupby');
moment = require('moment');

expensesCollection = require('./expenses-collection');
WeeklyModel = require('./weekly-model');

WeeklyCollection = AmpersandCollection.extend({
    initialize: function () {
        var self;

        self = this;

        self.updateWeekly();

        expensesCollection.on('add remove', function () {
            self.updateWeekly();
        });
    },

    updateWeekly: function () {
        var expensesByWeek, weekMoments, weeklies;

        weekMoments = {};

        expensesByWeek = groupBy(expensesCollection.models, function groupWeeks (expense) {
            var week, weekKey;

            week = moment(expense.datetime).startOf('week');
            weekKey = week.format('gggg-w');

            if (!weekMoments[weekKey]) {
                weekMoments[weekKey] = week;
            }

            return weekKey;
        });

        weeklies = Object.keys(expensesByWeek).map(function createWeeklies (weekKey) {
            var weekStart, weekEnd, weekName, weekly;

            weekStart = weekMoments[weekKey];
            weekEnd = moment(weekStart).endOf('week');
            weekName = weekStart.format('MMM Do, YYYY') + ' - ' + weekEnd.format('MMM Do, YYYY');
            weekly = new WeeklyModel({ name: weekName });

            expensesByWeek[weekKey].forEach(function addToWeek (expense) {
                weekly.add(expense.amount);
            });

            return weekly;
        });

        this.set(weeklies);
    }
});

module.exports = new WeeklyCollection();
