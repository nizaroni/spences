var AmpersandRouter, HomePage, SignUpPage, SpencesRouter;

AmpersandRouter = require('ampersand-router');

HomePage = require('./pages/home-page');
SignUpPage = require('./pages/signup-page');

SpencesRouter = AmpersandRouter.extend({
    routes: {
        '': 'home',
        'signup': 'signup',
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

    catchAll: function () {
        this.redirectTo('');
    }
});

module.exports = new SpencesRouter();
