var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'COZA STORE' });
});

router.get('/accounts', function(req, res, next) {
  res.render('accounts', { title: 'Quản lý tài khoản người dùng'});
});

router.get('/categories', function(req, res, next) {
  res.render('categories', { title: 'Quản lý gian hàng'});
});

router.get('/products', function(req, res, next) {
  res.render('products', { title: 'Quản lý sản phẩm'});
});

router.get('/orders', function(req, res, next) {
  res.render('orders', { title: 'Quản lý đơn hàng'});
});

router.get('/statistics_day', function(req, res, next) {
  res.render('statistics_day', { title: 'Thống kê'});
});

router.get('/statistics_week', function(req, res, next) {
  res.render('statistics_week', { title: 'Thống kê'});
});

router.get('/statistics_month', function(req, res, next) {
  res.render('statistics_month', { title: 'Thống kê'});
});

router.get('/statistics_quarter', function(req, res, next) {
  res.render('statistics_quarter', { title: 'Thống kê'});
});

router.get('/statistics_year', function(req, res, next) {
  res.render('statistics_year', { title: 'Thống kê'});
});

router.get('/bestseller', function(req, res, next) {
  res.render('bestseller', { title: 'Quản lý đơn hàng'});
});

router.get('/edit_info_admin', function(req,res,next) {
  res.render('edit_info_admin', {title: 'Chỉnh sửa thông tin'});
});
module.exports = router;
