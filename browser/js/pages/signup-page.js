var AmpersandView, UserForm, signUp, SignUpPage;

AmpersandView = require('ampersand-view');

UserForm = require('../forms/user-form');
signUp = require('../../templates/pages/signup.dom');

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
                        console.debug('Submit', formData);
                    }
                });

                return userForm;
            }
        }
    }
});

module.exports = SignUpPage;
