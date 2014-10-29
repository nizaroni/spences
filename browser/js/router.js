var AmpersandRouter, home, SpencesRouter;

AmpersandRouter = require('ampersand-router');

home = require('../templates/pages/home.dom');

SpencesRouter = AmpersandRouter.extend({
    routes: {
        '': 'home',
        '(*path)': 'catchAll'
    },

    home: function () {
        document.body.appendChild(home());

        this.trigger('page', 'home');
    },

    catchAll: function () {
        this.redirectTo('');
    }
});

module.exports = new SpencesRouter();
