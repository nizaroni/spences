var AmpersandSwitcher, AmpersandView, result,
    router, head, body,
    MainView
;

AmpersandSwitcher = require('ampersand-view-switcher');
AmpersandView = require('ampersand-view');
result = require('lodash.result');

router = require('../router');
head = require('../../templates/head.dom');
body = require('../../templates/body.dom');

MainView = AmpersandView.extend({
    template: body,

    initialize: function () {
        this.listenTo(router, 'page', this.switchPageView);
    },

    switchPageView: function (pageView) {
        this.pageSwitcher.set(pageView);
    },

    render: function () {
        var pageContainer;

        document.head.appendChild(head());

        this.renderWithTemplate(this);

        pageContainer = this.queryByHook('page-container');
        this.pageSwitcher = new AmpersandSwitcher(pageContainer, {
            show: function (newPage, oldPage) {
                document.title = result(newPage, 'pageTitle') || 'Spences';
                document.scrollTop = 0;
            }
        });

        return this;
    }
});

module.exports = MainView;
