var domready, router, spences;

domready = require('domready');

router = require('./router');

function Spences () {}

Spences.prototype.blastOff = function () {
    var self = this;

    domready(function initilizeView () {
        var h1 = document.createElement('h1');
        h1.textContent = 'Spences';
        document.body.appendChild(h1);

        router.history.start({ pushState: true, root: '/' });
    });
};

spences = new Spences();
module.exports = spences;
window.spences = spences;

spences.blastOff();
