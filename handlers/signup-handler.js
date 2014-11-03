var hashy, userFetchOrCreate;

hashy = require('hashy');

userFetchOrCreate = require('../lib/user-fetch-or-create');
jwtSign = require('../lib/jwt-sign');

function signup (request, reply) {
    var userInfo, payload;

    userInfo = request.payload;

    userFetchOrCreate(userInfo, function replyWithUser (err, user) {
        var token;

        if (err) {
            reply({ statusCode: 503, error: 'Service Unavailable' }).code(503);
            return;
        }

        if (user.isNew) {
            token = jwtSign(user);
            reply({ statusCode: 201, id: user.id, token: token }).code(201);
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

            token = jwtSign(user);
            payload = {
                statusCode: 400,
                error: 'Already Exists',
                id: user.id,
                name: user.name,
                email: user.email,
                token: token
            };

            reply(payload).code(400);
        });
    });
}

module.exports = signup;
