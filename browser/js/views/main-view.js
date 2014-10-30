var AmpersandView, router, body, MainView;

AmpersandView = require('ampersand-view');

router = require('../router');
body = require('../../templates/body.dom');

MainView = AmpersandView.extend({
    template: body,

    initialize: function () {
        this.listenTo(router, 'page', this.switchPageView);
    },

    switchPageView: function (pageView) {
        pageView.render();

        this
            .queryByHook('page-container')
            .appendChild(pageView.el)
        ;
    }
});

module.exports = MainView;
