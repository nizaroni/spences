var Moonboots, Hapi, api, env, browserFiles, server;

Moonboots = require('moonboots');
Hapi = require('hapi');

api = require('./handlers/api-handlers');
env = require('./lib/env');

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
    server = new Hapi.Server(8000);

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
        method: 'POST',
        path: '/api/users',
        handler: api.signup
    });

    server.route({
        method: 'GET',
        path: '/api/{param*}',
        handler: function replyWithNotFoundJson (request, reply) {
            reply({ statusCode: 404, error: 'Not Found' }).code(404);
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
