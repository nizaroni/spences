var api;

api = {
    signup: require('./signup-handler'),
    login: require('./login-handler'),
    loginToken: require('./login-token-handler'),
    expenses: require('./expenses-handler'),
    expenseAdd: require('./expense-add-handler')
};

module.exports = api;
