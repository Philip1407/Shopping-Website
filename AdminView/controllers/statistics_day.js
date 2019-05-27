//var statistics_day = require('..\views\statistics_day');

exports.statistics_day_list = function(req, res){
    res.render('statistics_day/statistics_day', { title: 'Thống kê', admin:req.user});
  };

// Display statistics_day update form on GET.
exports.statistics_day_update_get = function(req, res) {
  res.send('NOT IMPLEMENTED: statistics_day update GET');
};

// Handle statistics_day update on POST.
exports.statistics_day_update_post = function(req, res) {
  res.send('NOT IMPLEMENTED: statistics_day update POST');
};