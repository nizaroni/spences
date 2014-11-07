var AmpersandSwitcher, AmpersandView, result,
    navigate, router, head, body, me,
    MainView
;

AmpersandSwitcher = require('ampersand-view-switcher');
AmpersandView = require('ampersand-view');
result = require('lodash.result');
dom = require('ampersand-dom');

navigate = require('../helpers/navigate');
router = require('../router');
head = require('../../templates/head.dom');
body = require('../../templates/body.dom');
me = require('../helpers/me');

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
        var path;

        if (pageView.authOnly && !me()) {
            router.redirectTo('');
            return;
        }

        this.pageSwitcher.set(pageView);

        path = window.location.pathname.slice(1);

        this.queryAll('.nav a[href]').forEach(function (link) {
            var linkPath = link.pathname.slice(1);

            if ((!linkPath && !path) || (linkPath === path)) {
                dom.addClass(link.parentNode, 'active');
            } else {
                dom.removeClass(link.parentNode, 'active');
            }
        });
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
