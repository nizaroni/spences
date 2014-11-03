var AmpersandView, LoginForm, login, LoginPage;

AmpersandView = require('ampersand-view');

LoginForm = require('../forms/login-form');
login = require('../../templates/pages/login.dom');

LoginPage = AmpersandView.extend({
    pageTitle: 'Log in to Spences',

    template: login,

    subviews: {
        form: {
            hook: 'login-form',
            prepareView: function (el) {
                var self, loginForm;

                self = this;

                loginForm = new LoginForm({
                    el: el,
                    submitCallback: function (formData) {
                        console.log('Submit', formData);
                    }
                });

                return loginForm;
            }
        }
    }
});

module.exports = LoginPage;
