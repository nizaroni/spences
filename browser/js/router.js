var AmpersandRouter, HomePage, SpencesRouter;

AmpersandRouter = require('ampersand-router');

HomePage = require('./pages/home-page');

SpencesRouter = AmpersandRouter.extend({
    routes: {
        '': 'home',
        '(*path)': 'catchAll'
    },

    home: function () {
        var homePage = new HomePage();
        this.trigger('page', homePage);
    },

    catchAll: function () {
        this.redirectTo('');
    }
});

module.exports = new SpencesRouter();
