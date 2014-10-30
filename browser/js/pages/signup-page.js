var AmpersandView, signUp, SignUpPage;

AmpersandView = require('ampersand-view');

signUp = require('../../templates/pages/signup.dom');

SignUpPage = AmpersandView.extend({
    pageTitle: 'Create a Spences account',
    template: signUp
});

module.exports = SignUpPage;
