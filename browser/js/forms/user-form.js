var InputView, UserForm;

AmpersandFormView = require('ampersand-form-view');

InputView = require('../views/input-view');

UserForm = AmpersandFormView.extend({
    fields: function () {
        return [
            new InputView({
                label: 'Name',
                name: 'name',
                placeholder: 'e.g., Alfred Pennyworth',
                requiredMessage: 'Please tell us your name.',
                size: 'large',
                parent: this
            }),
            new InputView({
                label: 'Email',
                name: 'email',
                placeholder: 'e.g., alfred@batmail.com',
                requiredMessage: 'Please tell us your email.',
                size: 'large',
                parent: this
            }),
            new InputView({
                label: 'Password',
                name: 'password',
                type: 'password',
                requiredMessage: 'Secure your account with a password.',
                placeholder: 'e.g., ************************',
                size: 'large',
                parent: this
            })
        ];
    }
});

module.exports = UserForm;
