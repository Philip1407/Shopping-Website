var express = require('express');


// Require controller modules.
var product_controller = require('../controllers/productController');
var cart_controller = require('../controllers/cartController');
var user_controller = require('../controllers/userController');


module.exports = function(router, passport) {

	router.get('/', product_controller.index);
	router.post('/', product_controller.home_search);
	router.get('/filter/:type',product_controller.product_sort_home);
	router.get('/product', product_controller.product_list);
	router.post('/product', product_controller.product_search);
	router.get('/product/detail/:id', product_controller.product_detail);
	router.get('/product/filter/:type',product_controller.product_sort);

	router.get('/myaccount', isLoggedIn,user_controller.user_detail);
	router.get('/login', user_controller.user_login_get);
	router.get('/logout', user_controller.user_logout_get);
	router.post('/login',passport.authenticate('local-login', {
		successRedirect : '/',
        failureRedirect : '/login',
        failureFlash : true 
    }));
	router.get('/forgotpassword', user_controller.user_forgetpass_get);
	router.post('/forgotpassword', user_controller.user_forgetpass_post);
	router.get('/edit', isLoggedIn,user_controller.user_update_get);
	router.post('/edit',user_controller.user_update_post);
	router.get('/signin', user_controller.user_create_get);
	router.post('/signin', passport.authenticate('local-signup', {
        successRedirect : '/',
        failureRedirect : '/signin',
        failureFlash : true 
    }));

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
}
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}