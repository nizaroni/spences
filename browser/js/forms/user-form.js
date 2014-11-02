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
                size: 'large',
                parent: this
            }),
            new InputView({
                label: 'Email',
                name: 'email',
                placeholder: 'e.g., alfred@batmail.com',
                size: 'large',
                parent: this
            }),
            new InputView({
                label: 'Password',
                name: 'password',
                type: 'password',
                placeholder: 'e.g., ************************',
                size: 'large',
                parent: this
            })
        ];
    }
});

module.exports = UserForm;
