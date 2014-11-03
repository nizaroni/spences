var domready, navigate, MainView, router, spences;

domready = require('domready');

navigate = require('./helpers/navigate');
MainView = require('./views/main-view');
router = require('./router');

function Spences () {}

Spences.prototype.blastOff = function () {
    var self = this;

    domready(function initilizeView () {
        var mainView;

        mainView = new MainView({ el: document.body });
        mainView.render();
        self.view = mainView;

        router.history.start({ pushState: true, root: '/' });
    });
};

Spences.prototype.navigate = function (route) {
    navigate(route);
};

spences = new Spences();
module.exports = spences;
window.spences = spences;

spences.blastOff();
