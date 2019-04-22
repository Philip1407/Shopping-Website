var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Trang chủ' });
});
router.get('/myaccount', function(req, res, next) {
  res.render('account', { title: 'Tài khoản'});
});
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Đăng Nhập' ,layout: 'login'});
});
router.get('/forgotpassword', function(req, res, next) {
  res.render('forgotpassword', { title: 'Quên mật khẩu' ,layout: 'forgotpassword'});
});

router.get('/edit', function(req, res, next) {
  res.render('edit', { title: 'Chỉnh sửa thông tin'});
});

router.get('/signin', function(req, res, next) {
  res.render('signin', { title: 'Đăng ký'});
});
router.get('/shoppingcart', function(req, res, next) {
  res.render('shoppingcart', { title: 'Giỏ hàng'});
});
router.get('/product', function(req, res, next) {
  res.render('product', { title: 'Sản phẩm'});
});
module.exports = router;
