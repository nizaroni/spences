var userKey, db;

userKey = require('./user-key');
db = require('./db');

function userFetch (query, callback) {
    var userEmblem;

    query = query || {};
    userEmblem = query.email || query.id;

    db.hgetall(userKey(userEmblem), function deliverUser (err, user) {
        if (err) {
            callback(err);
            return;
        }

        user.id = +user.id;
        callback(null, user);
    });
}

module.exports = userFetch;
