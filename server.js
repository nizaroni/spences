var Moonboots, Hapi, env, browserFiles, server;

Moonboots = require('moonboots');
Hapi = require('hapi');

env = require('./lib/env');

browserFiles = new Moonboots({
    main: __dirname + '/browser/js/main.js',
    jsFileName: 'spences',
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
        path: '/{param*}',
        handler: function replyWithHtml (request, reply) {
            reply(browserFiles.htmlSource());
        }
    });

    server.start(function () {
        console.log('\nServer running at:', server.info.uri);
    });
});
