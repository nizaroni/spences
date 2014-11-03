var jwt;

jwt = require('jsonwebtoken');

function loginToken (request, reply) {
    payload = {
        statusCode: 200,
        id: request.auth.credentials.id,
        name: request.auth.credentials.name,
        email: request.auth.credentials.email
    };

    reply(payload).code(200);
}

module.exports = loginToken;
