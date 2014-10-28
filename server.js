var Moonboots, Hapi, browserFiles, server;

Moonboots = require('moonboots');
Hapi = require('hapi');

browserFiles = new Moonboots({
    main: __dirname + '/browser/js/main.js',
    jsFileName: 'spences',
    developmentMode: true
});

browserFiles.on('ready', function moonbootsReady () {
    server = new Hapi.Server(8000);

    server.route({
        method: 'GET',
        path: '/' + browserFiles.jsFileName(),
        handler: function replyWithJs (request, reply) {
            browserFiles.jsSource(function sendJsSource (err, js) {
                reply(js);
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
