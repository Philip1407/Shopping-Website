var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Trang chủ' });
});
router.get('/myaccount', function(req, res, next) {
  res.render('account', { title: 'Tài khoản' });
});

module.exports = router;
