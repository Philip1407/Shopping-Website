var express = require('express');
var router = express.Router();

// Require controller modules.
var product_controller = require('../controllers/productController');
var cart_controller = require('../controllers/cartController');
var user_controller = require('../controllers/userController');




router.get('/', product_controller.index);
router.get('/product', product_controller.product_list);
router.get('/product-detail', product_controller.product_detail)


router.get('/myaccount', user_controller.user_detail);
router.get('/login', user_controller.user_login_get);
router.post('/login',user_controller.user_login_post);
router.get('/forgotpassword', user_controller.user_forgetpass_get);
router.post('/forgotpassword', user_controller.user_forgetpass_post);
router.get('/edit', user_controller.user_update_get);
router.post('/edit',user_controller.user_update_post);
router.get('/signin', user_controller.user_create_get);
router.post('/signin', user_controller.user_create_post);


router.get('/shoppingcart', cart_controller.cart_update_get);
router.post('/shoppingcart', cart_controller.cart_update_post);
router.get('/history',cart_controller.cart_list);


router.get('/faq', function(req, res, next){
	res.render('faq', {title: 'Câu hỏi thường gặp'});
})

router.get('/policy', function(req, res, next){
	res.render('policy', {title: 'Chính sách đổi trả'});
})

router.get('/aboutus', function(req, res, next){
	res.render('aboutus', {title: 'Về chúng tôi'});
})
module.exports = router;
