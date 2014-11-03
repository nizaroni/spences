var hashy, userFetch, jwtSign;

hashy = require('hashy');

userFetch = require('../lib/user-fetch');
jwtSign = require('../lib/jwt-sign');

function login (request, reply) {
    var userInfo;

    userInfo = request.payload;

    userFetch({ email: userInfo.email }, function replyWithResult (err, user) {
        if (err) {
            reply({ statusCode: 503, error: 'Service Unavailable' }).code(503);
            return;
        }

        if (!user) {
            reply({ statusCode: 404, error: 'Not Found' }).code(404);
            return;
        }

        hashy.verify(userInfo.password, user.passwordHash, function replyWithUser (err, isPassword) {
            var payload;

            if (err) {
                reply({ statusCode: 503, error: 'Service Unavailable' }).code(503);
                return;
            }

            if (!isPassword) {
                reply({ statusCode: 403, error: 'Forbidden' }).code(403);
                return;
            }

            payload = {
                statusCode: 200,
                id: user.id,
                name: user.name,
                token: jwtSign(user)
            };

            reply(payload).code(200);
        });
    });
}

module.exports = login;
