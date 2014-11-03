var hashy, auto, test, jwt, jwtSign;

hashy = require('hashy');
auto = require('run-auto');
test = require('tape');
jwt = require('jsonwebtoken');

staggerResult = require('../stagger-result');
jwtSign = require('../../lib/jwt-sign');

test('jwtSign() test', function jwtSignTest (t) {
    var alfred, options, tasks;

    alfred = {
        id: 16,
        password: 'masterwayne'
    };

    options = { issuer: 'spences-test' };

    tasks = {};
    tasks.hashPassword = function hashPassword (callback) {
        hashy.hash(alfred.password, callback);
    };
    tasks.signToken = ['hashPassword', function signToken (callback, results) {
        alfred.passwordHash = results.hashPassword;
        callback(null, jwtSign(alfred));
    }];
    tasks.verify = ['signToken', function verify (callback, results) {
        jwt.verify(results.signToken, alfred.passwordHash, options, callback);
    }];
    tasks.badSecret = ['signToken', function badSecret (callback, results) {
        jwt.verify(results.signToken, 'dfsfsdfsdfsdf', options, staggerResult(callback));
    }];
    tasks.badIssuer = ['signToken', function badIssuer (callback, results) {
        var badOptions;

        badOptions = { issuer: 'spencesdjfsdfksdkfj' };
        jwt.verify(results.signToken, alfred.passwordHash, badOptions, staggerResult(callback));
    }];

    auto(tasks, function performTests (err, results) {
        t.error(err);
        t.equals(results.badSecret.message, 'invalid signature');
        t.equals(results.badIssuer.message, 'jwt issuer invalid. expected: spences-test');

        t.end();
    });

});
