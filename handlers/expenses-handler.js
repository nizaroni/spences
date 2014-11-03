var userExpensesFetch;

userExpensesFetch = require('../lib/user-expenses-fetch');

function expensesHandler (request, reply) {
    userExpensesFetch(request.auth.credentials.id, function (err, expenses) {
        if (err) {
            reply({ statusCode: 503, error: 'Service Unavailable' }).code(503);
            return;
        }

        reply(expenses).code(200);
    });
}

module.exports = expensesHandler;
