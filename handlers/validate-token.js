var userFetch;

userFetch = require('../lib/user-fetch');

function validateToken (decoded, request, next) {
    userFetch({ id: decoded.id }, function (err, user) {
        if (err) {
            next(err);
            return;
        }

        if (!user) {
            next(null, false);
            return;
        }

        next(null, true, user);
    });
}

module.exports = validateToken;
