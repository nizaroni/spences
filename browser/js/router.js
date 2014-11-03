var AmpersandRouter, HomePage, SignUpPage, SpencesRouter;

AmpersandRouter = require('ampersand-router');

HomePage = require('./pages/home-page');
SignUpPage = require('./pages/signup-page');
LoginPage = require('./pages/login-page');
ExpensesPage = require('./pages/expenses-page');

SpencesRouter = AmpersandRouter.extend({
    routes: {
        '': 'home',
        'signup': 'signup',
        'login': 'login',
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

    login: function () {
        var loginPage = new LoginPage();
        this.trigger('page', loginPage);
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
