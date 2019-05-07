//var bestseller = require('../views/bestseller');

exports.bestseller_list = function(req, res){
    res.render('bestseller/bestseller', { title: 'Quản lý đơn hàng'});
  };