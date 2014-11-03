var auto, test, jwt, staggerResult, userCreate, userKey, server, env, db;

auto = require('run-auto');
test = require('tape');
jwt = require('jsonwebtoken');

staggerResult = require('../stagger-result');
userCreate = require('../../lib/user-create');
userKey = require('../../lib/user-key');
server = require('../../server');
env = require('../../lib/env');
db = require('../../lib/db');

test('/api/login POST test', function apiUsersPostTest (t) {
    var gordon, gordonLogin, request, tasks;

    gordon = {
        name: 'James Gordon',
        email: 'comissioner@gothampolice.com',
        password: 'mustache'
    };

    gordonLogin = {
        email: gordon.email,
        password: gordon.password
    }

    request = {
        method: 'POST',
        url: '/api/login',
        payload: JSON.stringify(gordonLogin)
    };

    function login (callback) {
        server.inject(request, staggerResult(callback));
    }

    tasks = {};
    tasks.fetchId = function fetchId (callback) {
        db.hget(userKey(gordon.email), 'id', callback);
    };
    tasks.deletePrevious = ['fetchId', function deletePrevious (callback, results) {
        db.del(userKey(gordon.email), userKey(results.fetchId), callback);
    }];
    tasks.notFoundLogin = ['deletePrevious', login];
    tasks.create = ['notFoundLogin', function create (callback) {
        userCreate(gordon, callback);
    }];
    tasks.badPasswordLogin = ['create', function badPasswordLogin (callback) {
        var badPasswordRequest;

        gordonLogin.password = 'barbara';

        badPasswordRequest = {
            method: 'POST',
            url: '/api/login',
            payload: JSON.stringify(gordonLogin)
        };

        server.inject(badPasswordRequest, staggerResult(callback));
    }];
    tasks.successfulLogin = ['create', login];
    tasks.verifyIdWithEmail = ['successfulLogin', function verifyIdWithEmail (callback, results) {
        db.hget(userKey(results.successfulLogin.result.id), 'email', callback);
    }];
    tasks.verifyToken = ['successfulLogin', function verifyToken (callback, results) {
        jwt.verify(results.successfulLogin.result.token, env.get('jwtSecret'), { issuer: 'spences-test' }, staggerResult(callback));
    }];

    auto(tasks, function performTests (err, results) {
        if (err) {
            throw err;
        }

        t.equal(results.notFoundLogin.statusCode, 404);
        t.equal(results.notFoundLogin.result.statusCode, 404);
        t.equal(results.notFoundLogin.result.error, 'Not Found');
        t.notOk(results.notFoundLogin.result.id);
        t.notOk(results.notFoundLogin.result.name);
        t.notOk(results.notFoundLogin.result.token);

        t.equal(results.badPasswordLogin.statusCode, 403);
        t.equal(results.badPasswordLogin.result.statusCode, 403);
        t.equal(results.badPasswordLogin.result.error, 'Forbidden');
        t.notOk(results.badPasswordLogin.result.id);
        t.notOk(results.badPasswordLogin.result.name);
        t.notOk(results.badPasswordLogin.result.token);

        t.equal(results.successfulLogin.statusCode, 200);
        t.equal(results.successfulLogin.result.statusCode, 200);
        t.equal(results.successfulLogin.result.name, gordon.name);

        t.equal(results.verifyIdWithEmail, gordon.email, 'Returned Id should have correct email.');

        t.error(results.verifyToken);

        t.end();
    });

});
