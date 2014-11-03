var AmpersandModel, TokenModel;

AmpersandModel = require('ampersand-model');

TokenModel = AmpersandModel.extend({
    type: 'token',

    props: {
        email: [ 'string', true ]
    },

    session: {
        password: 'string',
        token: 'string'
    },

    url: '/api/login'
});

module.exports = TokenModel;
