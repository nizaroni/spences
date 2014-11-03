var userCreate, userFetch;

userCreate = require('./user-create');
userFetch = require('./user-fetch');

function userFetchOrCreate (userInfo, callback) {
    userFetch({ email: userInfo.email }, function deliverUser (err, user) {
        if (err) {
            callback(err);
            return;
        }

        if (user) {
            callback(null, user);
            return;
        }

        userCreate(userInfo, callback);
    });
}

module.exports = userFetchOrCreate;
