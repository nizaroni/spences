var AmpersandRouter, SpencesRouter;

AmpersandRouter = require('ampersand-router');

SpencesRouter = AmpersandRouter.extend({
    routes: {
        '': 'home',
        '(*path)': 'catchAll'
    },

    home: function () {
        var h2 = document.createElement('h2');
        h2.textContent = 'Home page';
        document.body.appendChild(h2);

        this.trigger('page', 'home');
    },

    catchAll: function () {
        this.redirectTo('');
    }
});

module.exports = new SpencesRouter();
