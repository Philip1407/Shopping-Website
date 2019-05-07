//var orders = require('..\views\orders');

exports.orders_list = function(req, res){
    res.render('orders/orders', { title: 'Quản lý đơn hàng'});
  };

// Display orders delete form on GET.
exports.orders_delete_get = function(req, res) {
  res.send('NOT IMPLEMENTED: orders delete GET');
};

// Handle orders delete on POST.
exports.orders_delete_post = function(req, res) {
  res.send('NOT IMPLEMENTED: orders delete POST');
};

exports.orders_getdetail = function(req,res) {
  res.render('orders/orders_detail', { title: 'Chi tiết đơn hàng'});
};