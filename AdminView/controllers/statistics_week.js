//var statistics_week = require('..\views\statistics_week');

exports.statistics_week_list = function(req, res){
  res.render('statistics_week/statistics_week', { title: 'Thống kê'});
};

// Display statistics_week update form on GET.
exports.statistics_week_update_get = function(req, res) {
res.send('NOT IMPLEMENTED: statistics_week update GET');
};

// Handle statistics_week update on POST.
exports.statistics_week_update_post = function(req, res) {
res.send('NOT IMPLEMENTED: statistics_week update POST');
};