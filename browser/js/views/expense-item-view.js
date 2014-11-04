var AmpersandView, expenseItem, ExpenseItemView;

AmpersandView = require('ampersand-view');

expenseItem = require('../../templates/includes/expense-item.dom');

module.exports = AmpersandView.extend({
    template: expenseItem,
    bindings: {
        'model.date': '[data-hook~=date]',
        'model.time': '[data-hook~=time]',
        'model.prettyAmount': '[data-hook~=prettyAmount]',
        'model.description': '[data-hook~=description]',
        'model.comments': '[data-hook~=comments]'
    }
});
