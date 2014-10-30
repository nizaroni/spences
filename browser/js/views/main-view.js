var AmpersandView, body, MainView;

AmpersandView = require('ampersand-view');

body = require('../../templates/body.dom');

MainView = AmpersandView.extend({ template: body });

module.exports = MainView;
