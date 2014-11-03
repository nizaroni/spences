var api;

api = {
    signup: require('./signup-handler'),
    login: require('./login-handler'),
    loginToken: require('./login-token-handler')
};

module.exports = api;
