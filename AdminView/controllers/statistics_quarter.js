//var statistics_quarter = require('..\views\statistics_quarter');

exports.statistics_quarter_list = function(req, res){
  res.render('statistics_quarter/statistics_quarter', { title: 'Thống kê'});
};

// Display statistics_quarter update form on GET.
exports.statistics_quarter_update_get = function(req, res) {
res.send('NOT IMPLEMENTED: statistics_quarter update GET');
};

// Handle statistics_quarter update on POST.
exports.statistics_quarter_update_post = function(req, res) {
res.send('NOT IMPLEMENTED: statistics_quarter update POST');
};