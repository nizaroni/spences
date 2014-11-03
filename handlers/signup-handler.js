var hashy, userFetchOrCreate;

hashy = require('hashy');

userFetchOrCreate = require('../lib/user-fetch-or-create');

function signup (request, reply) {
    var userInfo, payload;

    userInfo = request.payload;

    userFetchOrCreate(userInfo, function replyWithUser (err, user) {
        if (err) {
            reply({ statusCode: 503, error: 'Service Unavailable' }).code(503);
            return;
        }

        if (user.isNew) {
            reply({ statusCode: 201, id: user.id, token: 'qwertyuiop' }).code(201);
            return;
        }

        hashy.verify(userInfo.password, user.passwordHash, function replyWithExistingUser (err, isPassword) {
            if (err) {
                reply({ statusCode: 503, error: 'Service Unavailable' }).code(503);
                return;
            }

            if (!isPassword) {
                reply({ statusCode: 400, error: 'Already Exists' }).code(400);
                return;
            }

            payload = {
                statusCode: 400,
                error: 'Already Exists',
                id: user.id,
                name: user.name,
                email: user.email,
                token: 'qwertyuiop'
            };

            reply(payload).code(400);
        });
    });
}

module.exports = signup;
