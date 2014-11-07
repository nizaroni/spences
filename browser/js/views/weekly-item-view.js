var AmpersandView, weeklyItem, WeeklyItemView;

AmpersandView = require('ampersand-view');

weeklyItem = require('../../templates/includes/weekly-item.dom');

WeeklyItemView = AmpersandView.extend({
    template: weeklyItem,

    bindings: {
        'model.name': '[data-hook~=name]',
        'model.prettyAmount': '[data-hook~=prettyAmount]',
        'model.prettyDailyAverage': '[data-hook~=prettyDailyAverage]'
    }
});

module.exports = WeeklyItemView;
