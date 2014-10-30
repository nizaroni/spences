var AmpersandView, home, HomePage;

AmpersandView = require('ampersand-view');

home = require('../../templates/pages/home.dom');

HomePage = AmpersandView.extend({ template: home });

module.exports = HomePage;
