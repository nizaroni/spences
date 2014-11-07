var parallel, domready, store, TokenModel, navigate, MainView, MeModel, router, me, spences;

parallel = require('run-parallel');
domready = require('domready');
store = require('store');

TokenModel = require('./models/token-model');
navigate = require('./helpers/navigate');
MainView = require('./views/main-view');
MeModel = require('./models/me-model');
router = require('./router');
me = require('./helpers/me');

function Spences () {}

Spences.prototype.blastOff = function () {
    var self;

    self = this;

    function user (callback) {
        self.fetchUser(callback);
    }

    function dom (callback) {
        domready(callback);
    }

    parallel([ user, dom ], function initilizeView () {
        var mainView;

        mainView = new MainView({ el: document.body });
        mainView.render();
        self.view = mainView;

        router.history.start({ pushState: true, root: '/' });
    });
};

Spences.prototype.fetchUser = function (callback) {
    var token;

    if (!store.get('token')) {
        callback();
        return;
    }

    token = new TokenModel();
    token.fetch({
        error: function (token, response) {
            if (response.statusCode === 401) {
                store.remove('token');
            }

            callback();
        },
        success: function saveMe (token, response) {
            var newMe;

            newMe = new MeModel(response);
            me(newMe);
            callback();
        }
    });
};

Spences.prototype.navigate = function (route) {
    navigate(route);
};

spences = new Spences();
module.exports = spences;
window.spences = spences;

spences.blastOff();
