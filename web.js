var Hapi, server;

Hapi = require('hapi');

server = new Hapi.Server(8000);

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Hello, world!');
    }
});

server.start(function () {
    console.log('\nServer running at:', server.info.uri);
});
