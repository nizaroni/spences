var domready, router, spences;

domready = require('domready');

router = require('./router');
body = require('../templates/body.dom');

function Spences () {}

Spences.prototype.blastOff = function () {
    var self = this;

    domready(function initilizeView () {
        document.body.appendChild(body());

        router.history.start({ pushState: true, root: '/' });
    });
};

spences = new Spences();
module.exports = spences;
window.spences = spences;

spences.blastOff();
