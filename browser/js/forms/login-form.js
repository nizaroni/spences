var AmpersandFormView, InputView, LoginForm;

AmpersandFormView = require('ampersand-form-view');

InputView = require('../views/input-view');

LoginForm = AmpersandFormView.extend({
    fields: function () {
        return [
            new InputView({
                label: 'Email',
                name: 'email',
                placeholder: 'e.g., alfred@batmail.com',
                requiredMessage: 'Please enter your email.',
                size: 'large',
                parent: this
            }),
            new InputView({
                label: 'Password',
                name: 'password',
                type: 'password',
                requiredMessage: 'Please enter your password.',
                placeholder: 'e.g., ************************',
                size: 'large',
                parent: this
            })
        ];
    }
});

module.exports = LoginForm;
