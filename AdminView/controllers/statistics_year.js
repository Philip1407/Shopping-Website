//var statistics_year = require('..\views\statistics_year');

exports.statistics_year_list = function(req, res){
  res.render('statistics_year/statistics_year', { title: 'Thống kê'});
};

// Display statistics_year update form on GET.
exports.statistics_year_update_get = function(req, res) {
res.send('NOT IMPLEMENTED: statistics_year update GET');
};

// Handle statistics_year update on POST.
exports.statistics_year_update_post = function(req, res) {
res.send('NOT IMPLEMENTED: statistics_year update POST');
};