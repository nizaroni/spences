var parallel, hashy, userNewId, userKey, db;

parallel = require('run-parallel');
hashy = require('hashy');

userNewId = require('./user-new-id');
userKey = require('./user-key');
db = require('./db');

function userCreate (userInfo, callback) {
    function hashPassword (callback) {
        hashy.hash(userInfo.password, callback);
    }

    parallel([ userNewId, hashPassword ], function persistUser (err, results) {
        var user, multi;

        if (err) {
            callback(err);
            return;
        }

        user = {
            id: results[0],
            name: userInfo.name,
            email: userInfo.email,
            passwordHash: results[1]
        };

        multi = db.multi();
        multi.hmset(userKey(user.email), user);
        multi.hmset(userKey(user.id), user);
        multi.exec(function deliverUser (err) {
            if (err) {
                callback(err);
                return;
            }

            callback(null, user);
        });
    });
}

module.exports = userCreate;
