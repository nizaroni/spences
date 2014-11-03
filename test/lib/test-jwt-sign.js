var hashy, auto, test, jwt, jwtSign, env;

hashy = require('hashy');
auto = require('run-auto');
test = require('tape');
jwt = require('jsonwebtoken');

staggerResult = require('../stagger-result');
jwtSign = require('../../lib/jwt-sign');
env = require('../../lib/env');

test('jwtSign() test', function jwtSignTest (t) {
    var alfred, token, options, tasks;

    alfred = {
        id: 16,
        password: 'masterwayne'
    };

    token = jwtSign(alfred);
    options = { issuer: 'spences-test' };

    tasks = {};
    tasks.verify = function verify (callback, results) {
        jwt.verify(token, env.get('jwtSecret'), options, callback);
    };
    tasks.badSecret = function badSecret (callback, results) {
        jwt.verify(token, 'dfsfsdfsdfsdf', options, staggerResult(callback));
    };
    tasks.badIssuer = function badIssuer (callback, results) {
        var badOptions;

        badOptions = { issuer: 'spencesdjfsdfksdkfj' };
        jwt.verify(token, env.get('jwtSecret'), badOptions, staggerResult(callback));
    };

    auto(tasks, function performTests (err, results) {
        t.error(err);
        t.equals(results.badSecret.message, 'invalid signature');
        t.equals(results.badIssuer.message, 'jwt issuer invalid. expected: spences-test');

        t.end();
    });

});
