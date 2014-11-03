var AmpersandInputView, formInput, InputView;

AmpersandInputView = require('ampersand-input-view');

formInput = require('../../templates/includes/form-input.dom');

InputView = AmpersandInputView.extend({
    template: formInput,

    initialize: function (options) {
        this.constructor.__super__.initialize.apply(this, arguments);

        this.sizeClassLabel = '';
        this.sizeClassInput = '';
        this.sizeRows = 2;

        if (options.size === 'large') {
            this.sizeClassLabel = 'h4';
            this.sizeClassInput = 'input-lg';
            this.sizeRows = 4;
        }

        if (options.isTextArea) {
            this.isTextArea = true;
        }
    },

    props: {
        validClass: ['string', true, 'has-success'],
        invalidClass: ['string', true, 'has-error']
    },

    bindings: {
        'name': {
            type: 'attribute',
            selector: 'input, textarea',
            name: 'name'
        },
        'label': [
            {
                hook: 'label'
            },
            {
                type: 'toggle',
                hook: 'label'
            }
        ],
        'message': {
            type: 'text',
            hook: 'message-text'
        },
        'showMessage': {
            type: 'toggle',
            hook: 'message-container'
        },
        'placeholder': {
            type: 'attribute',
            selector: 'input, textarea',
            name: 'placeholder'
        },
        'validityClass': [
            {
                type: 'class',
                selector: 'input, textarea'
            }, {
                type: 'class',
                hook: 'validity-class'
            }
        ],
        'rootElementClass': {
            type: 'class',
            selector: ''
        }
    },

});

module.exports = InputView;
