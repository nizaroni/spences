var AmpersandModel, MeModel;

AmpersandModel = require('ampersand-model');

MeModel = AmpersandModel.extend({
    type: 'user',

    props: {
        id: [ 'number' ],
        name: [ 'string' ],
        email: [ 'string', true ]
    },

    session: {
        password: 'string',
        token: 'string'
    },

    url: '/api/users'

});

module.exports = MeModel;
