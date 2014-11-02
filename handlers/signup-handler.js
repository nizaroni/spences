function signup (request, reply) {
    // reply({ statusCode: 400, error: 'Already Exists' }).code(400);
    // reply({ statusCode: 503, error: 'Service Unavailable' }).code(503);

    // var payload;

    // payload = {
    //     statusCode: 400,
    //     error: 'Already Exists',
    //     id: 42,
    //     name: 'Alfred Pennyworth',
    //     email: 'alfred@batmail.com',
    //     token: 'qwertyuiop'
    // };

    // reply(payload).code(400);

    reply({ statusCode: 201, id: 42, token: 'qwertyuiop' }).code(201);
}

module.exports = signup;
