//var statistics_month = require('..\views\statistics_month');

exports.statistics_month_list = function(req, res){
  res.render('statistics_month/statistics_month', { title: 'Thống kê'});
};

// Display statistics_month update form on GET.
exports.statistics_month_update_get = function(req, res) {
res.send('NOT IMPLEMENTED: statistics_month update GET');
};

// Handle statistics_month update on POST.
exports.statistics_month_update_post = function(req, res) {
res.send('NOT IMPLEMENTED: statistics_month update POST');
};