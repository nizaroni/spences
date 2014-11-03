var AmpersandView, store, TokenModel, LoginForm, MeModel, login, me, LoginPage;

AmpersandView = require('ampersand-view');
store = require('store');

TokenModel = require('../models/token-model');
LoginForm = require('../forms/login-form');
MeModel = require('../models/me-model');
login = require('../../templates/pages/login.dom');
me = require('../helpers/me');

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
                        var token;

                        token = new TokenModel();
                        token.save(formData, {
                            wait: true,
                            error: function (token, xhr) {
                                console.error('Server error. Show feedback.');
                            },
                            success: function (token, response) {
                                var newMe;

                                response.email = formData.email;

                                newMe = new MeModel(response);
                                me(newMe);
                                store.set('token', newMe.token);
                                spences.navigate('expenses');
                            }
                        });
                    }
                });

                return loginForm;
            }
        }
    }
});

module.exports = LoginPage;
