var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Trang chủ' });
});
router.get('/myaccount', function(req, res, next) {
  res.render('account', { title: 'Tài khoản' ,layout: 'account'});
});
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Đăng Nhập' ,layout: 'login'});
});
router.get('/forgotpassword', function(req, res, next) {
  res.render('forgotpassword', { title: 'Quên mật khẩu' ,layout: 'forgotpassword'});
});

module.exports = router;
