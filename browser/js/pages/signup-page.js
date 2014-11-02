var AmpersandView, UserForm, signUp, SignUpPage;

AmpersandView = require('ampersand-view');

UserForm = require('../forms/user-form');
signUp = require('../../templates/pages/signup.dom');
MeModel = require('../models/me-model');

SignUpPage = AmpersandView.extend({
    pageTitle: 'Create a Spences account',
    template: signUp,
    subviews: {
        form: {
            hook: 'signup-form',
            prepareView: function (el) {
                var userForm;

                userForm = new UserForm({
                    el: el,
                    submitCallback: function (formData) {
                        var me;

                        me = new MeModel();
                        me.save(formData, {
                            wait: true,
                            error: function (me, xhr) {
                                if (xhr.body.error === 'Already Exists') {
                                    if (xhr.body.token) {
                                        me.set(xhr.body);
                                        console.log('SUCCESS', me.id);
                                        return;
                                    }

                                    console.error('Account exists but bad password. Redirect to login with message.');
                                    return;
                                }

                                console.error('Server error. Show feedback.');
                            },
                            success: function () {
                                console.log('SUCCESS', me.id);
                            }
                        });
                    }
                });

                return userForm;
            }
        }
    }
});

module.exports = SignUpPage;
