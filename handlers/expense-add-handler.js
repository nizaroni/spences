var expenseCreate;

expenseCreate = require('../lib/expense-create');

function expenseAdd (request, reply) {
    var expenseInfo;

    expenseInfo = request.payload;
    expenseInfo.user = request.auth.credentials.id;

    expenseCreate(expenseInfo, function replyWithResult (err, expense) {
        if (err) {
            reply({ statusCode: 503, error: 'Service Unavailable' }).code(503);
            return;
        }

        reply({ statusCode: 201, id: expense.id }).code(201);
    });
}

module.exports = expenseAdd;
