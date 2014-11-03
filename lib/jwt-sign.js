var jwt, env, issuer;

jwt = require('jsonwebtoken');

env = require('./env');

issuer = 'spences';

if (env.get('nodeEnv')) {
    issuer += '-' + env.get('nodeEnv');
}

function jwtSign (user) {
    var payload;

    payload = { id: user.id };
    return jwt.sign(payload, env.get('jwtSecret'), {
        issuer: issuer,
        subject: 'user-' + user.id,
        expiresInMinutes: 600
    });
}

module.exports = jwtSign;
