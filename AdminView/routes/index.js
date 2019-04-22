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

router.get('/statistics', function(req, res, next) {
  res.render('statistics', { title: 'Thống kê'});
});

router.get('/bestseller', function(req, res, next) {
  res.render('bestseller', { title: 'Quản lý đơn hàng'});
});

module.exports = router;
