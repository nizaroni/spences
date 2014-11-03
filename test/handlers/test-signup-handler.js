var auto, test, userKey, server, db;

auto = require('run-auto');
test = require('tape');

staggerResult = require('../stagger-result');
userKey = require('../../lib/user-key');
server = require('../../server');
db = require('../../lib/db');

test('/api/users test', function (t) {
    var robin, tasks, request;

    robin = {
        name: 'Damian Wayne',
        email: 'damian@batmail.com',
        password: 'assassinate'
    };

    request = {
        method: 'POST',
        url: '/api/users',
        payload: JSON.stringify(robin)
    };

    tasks = {};
    tasks.fetchId = function fetchId (callback) {
        db.hget(userKey(robin.email), 'id', callback);
    };
    tasks.deletePrevious = ['fetchId', function deletePrevious (callback, results) {
        db.del(userKey(robin.email), userKey(results.fetchId), callback);
    }];
    tasks.create = ['deletePrevious', function create (callback) {
        server.inject(request, staggerResult(callback));
    }];
    tasks.fetch = ['create', function fetch (callback) {
        server.inject(request, staggerResult(callback));
    }];
    tasks.badPassword = ['create', function badPassword (callback) {
        var badPasswordRequest;

        robin.password = 'lazarus';

        badPasswordRequest = {
            method: 'POST',
            url: '/api/users',
            payload: JSON.stringify(robin)
        };

        server.inject(badPasswordRequest, staggerResult(callback));
    }];
    tasks.confirmIdEmail = ['create', function confirmIdEmail (callback, results) {
        db.hget(userKey(results.create.result.id), 'email', callback);
    }];

    auto(tasks, function (err, results) {
        if (err) {
            throw err;
        }

        t.equal(results.create.statusCode, 201, 'Create response status code should be 201.');
        t.equal(results.create.result.statusCode, 201);
        t.ok(results.create.result.id, 'Create response should have id.');
        t.ok(results.create.result.token, 'Create response should have token.');

        t.equal(results.fetch.statusCode, 400, 'Fetch response status code should be 400.');
        t.equal(results.fetch.result.statusCode, 400);
        t.equal(results.fetch.result.error, 'Already Exists');
        t.equal(results.fetch.result.id, results.create.result.id, 'Fetch response should have same id as create response.');
        t.equal(results.fetch.result.name, robin.name, 'Fetch response should have correct name.');
        t.equal(results.fetch.result.email, robin.email, 'Fetch response should have correct email.');
        t.ok(results.fetch.result.token, 'Fetch response should have token.');

        t.equal(results.badPassword.statusCode, 400, 'Bad password response status code should be 400.');
        t.equal(results.badPassword.result.statusCode, 400);
        t.equal(results.badPassword.result.error, 'Already Exists');
        t.notOk(results.badPassword.result.id);
        t.notOk(results.badPassword.result.name);
        t.notOk(results.badPassword.result.email);
        t.notOk(results.badPassword.result.token);

        t.equal(results.confirmIdEmail, robin.email, 'Returned Id should have correct email.');

        server.stop();
        t.end();
    });

});
