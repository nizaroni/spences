var AmpersandView, UserForm, MeModel, signUp, SignUpPage;

AmpersandView = require('ampersand-view');
store = require('store');

UserForm = require('../forms/user-form');
MeModel = require('../models/me-model');
signUp = require('../../templates/pages/signup.dom');
me = require('../helpers/me');

SignUpPage = AmpersandView.extend({
    pageTitle: 'Create a Spences account',
    template: signUp,
    subviews: {
        form: {
            hook: 'signup-form',
            prepareView: function (el) {
                var self, userForm;

                self = this;

                userForm = new UserForm({
                    el: el,
                    submitCallback: function (formData) {
                        var newMe;

                        newMe = new MeModel();
                        newMe.save(formData, {
                            wait: true,
                            error: function (newMe, xhr) {
                                if (xhr.body.error === 'Already Exists') {
                                    if (xhr.body.token) {
                                        newMe.set(xhr.body);
                                        self.successfulSignup(newMe);
                                        return;
                                    }

                                    console.error('Account exists but bad password. Redirect to login with message.');
                                    return;
                                }

                                console.error('Server error. Show feedback.');
                            },
                            success: function () {
                                self.successfulSignup(newMe);
                            }
                        });
                    }
                });

                return userForm;
            }
        }
    },

    successfulSignup: function (newMe) {
        me(newMe);
        store.set('token', newMe.token);
        spences.navigate('expenses');
    }
});

module.exports = SignUpPage;
