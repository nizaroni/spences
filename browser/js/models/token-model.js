var AmpersandModel, store, TokenModel;

AmpersandModel = require('ampersand-model');
store = require('store');

TokenModel = AmpersandModel.extend({
    type: 'token',

    props: {
        email: [ 'string', true ]
    },

    session: {
        password: 'string',
        token: 'string'
    },

    url: '/api/login',

    ajaxConfig: function setTokenHeader () {
        var config;

        config = {};

        if (store.get('token')) {
            config.headers = {
                Authorization: 'Bearer ' + store.get('token')
            };
        }

        return config;
    }
});

module.exports = TokenModel;
