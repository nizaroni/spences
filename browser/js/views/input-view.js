var AmpersandInputView, formInput, InputView;

AmpersandInputView = require('ampersand-input-view');

formInput = require('../../templates/includes/form-input.dom');

InputView = AmpersandInputView.extend({
    template: formInput,

    initialize: function (options) {
        this.sizeClassLabel = '';
        this.sizeClassInput = '';

        if (options.size === 'large') {
            this.sizeClassLabel = 'h4';
            this.sizeClassInput = 'input-lg';
        }
    }

});

module.exports = InputView;
