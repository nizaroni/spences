var AmpersandRouter, HomePage, SignUpPage, SpencesRouter;

AmpersandRouter = require('ampersand-router');

HomePage = require('./pages/home-page');
SignUpPage = require('./pages/signup-page');
ExpensesPage = require('./pages/expenses-page');

SpencesRouter = AmpersandRouter.extend({
    routes: {
        '': 'home',
        'signup': 'signup',
        'expenses': 'expenses',
        '(*path)': 'catchAll'
    },

    home: function () {
        var homePage = new HomePage();
        this.trigger('page', homePage);
    },

    signup: function () {
        var signUpPage = new SignUpPage();
        this.trigger('page', signUpPage);
    },

    expenses: function () {
        var expensesPage = new ExpensesPage();
        this.trigger('page', expensesPage);
    },

    catchAll: function () {
        this.redirectTo('');
    }
});

module.exports = new SpencesRouter();
