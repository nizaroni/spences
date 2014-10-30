var AmpersandSwitcher, AmpersandView, result,
    navigate, router, head, body,
    MainView
;

AmpersandSwitcher = require('ampersand-view-switcher');
AmpersandView = require('ampersand-view');
result = require('lodash.result');

navigate = require('../helpers/navigate');
router = require('../router');
head = require('../../templates/head.dom');
body = require('../../templates/body.dom');

MainView = AmpersandView.extend({
    template: body,

    events: { 'click a[href]': 'navigateFromLinkEvent' },

    initialize: function () {
        this.listenTo(router, 'page', this.switchPageView);
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
    },

    switchPageView: function (pageView) {
        this.pageSwitcher.set(pageView);
    },

    navigateFromLinkEvent: function (event) {
        var link, isSameOrigin, isModifiedByKeys;

        link= event.target;
        isSameOrigin = link.host === window.location.host;
        isModifiedByKeys = event.ctrlKey
            || event.shiftKey
            || event.altKey
            || event.metaKey
        ;

        if (isSameOrigin && !isModifiedByKeys) {
            event.preventDefault();
            navigate(link.pathname);
        }
    }
});

module.exports = MainView;
