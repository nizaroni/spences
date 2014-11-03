var Moonboots, HapiJwt, Hapi, validateToken, api, env, server, browserFiles;

Moonboots = require('moonboots');
HapiJwt = require('hapi-jwt');
Hapi = require('hapi');

validateToken = require('./handlers/validate-token');
api = require('./handlers/api-handlers');
env = require('./lib/env');

server = new Hapi.Server(env.get('port') || 8000);

server.route({
    method: 'POST',
    path: '/api/users',
    handler: api.signup
});

server.route({
    method: 'POST',
    path: '/api/login',
    handler: api.login
});

server.route({
    method: 'GET',
    path: '/api/{param*}',
    handler: function replyWithNotFoundJson (request, reply) {
        reply({ statusCode: 404, error: 'Not Found' }).code(404);
    }
});

server.pack.register(HapiJwt, function (err) {
    var options;

    if (err) {
        throw err;
    }

    options = {
        secret: env.get('jwtSecret'),
        validateFunc: validateToken
    };

    server.auth.strategy('jwt', 'bearer-access-token', options);

    server.route({
        method: 'GET',
        path: '/api/login',
        handler: api.loginToken,
        config: { auth: 'jwt' }
    });

    server.route({
        method: 'GET',
        path: '/api/expenses',
        handler: api.expenses,
        config: { auth: 'jwt' }
    });

    server.route({
        method: 'POST',
        path: '/api/expenses',
        handler: api.expenseAdd,
        config: { auth: 'jwt' }
    });
});

browserFiles = new Moonboots({
    main: __dirname + '/browser/js/main.js',
    jsFileName: 'spences',
    cssFileName: 'spences',
    stylesheets: [
        __dirname + '/browser/css/bootstrap.css'
    ],
    developmentMode: env.get('isDev'),
    browserify: {
        transforms: [ 'domthingify' ]
    }
});

browserFiles.on('ready', function moonbootsReady () {
    server.route({
        method: 'GET',
        path: '/' + browserFiles.jsFileName(),
        handler: function replyWithJs (request, reply) {
            browserFiles.jsSource(function sendJsSource (err, js) {
                reply(js).header('Content-Type', 'application/javascript');
            });
        }
    });

    server.route({
        method: 'GET',
        path: '/' + browserFiles.cssFileName(),
        handler: function replyWithCss (request, reply) {
            browserFiles.cssSource(function sendCssSource (err, css) {
                reply(css).header('Content-Type', 'text/css');
            });
        }
    });

    server.route({
        method: 'GET',
        path: '/bootstrap.css.map',
        handler: {
            file: __dirname + '/public/bootstrap.css.map'
        }
    });

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: function replyWithHtml (request, reply) {
            reply(browserFiles.htmlSource());
        }
    });

    server.start(function () {
        console.log('\nServer running at:', server.info.uri);
    });
});

module.exports = server;
