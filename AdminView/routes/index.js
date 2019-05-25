var express = require('express');
var router = express.Router();

var home_controller = require('../controllers/home');
var accounts_controller = require('../controllers/accounts');
var categories_controller = require('../controllers/categories');
var products_controller = require('../controllers/products');
var bestseller_controller = require('../controllers/bestseller');
var edit_info_admin_controller = require('../controllers/edit_info_admin');
var orders_controller = require('../controllers/orders');
var statistics_day_controller = require('../controllers/statistics_day');
var statistics_month_controller = require('../controllers/statistics_month');
var statistics_week_controller = require('../controllers/statistics_week');
var statistics_quarter_controller = require('../controllers/statistics_quarter');
var statistics_year_controller = require('../controllers/statistics_year');
var login_controller=require('../controllers/admins');

module.exports = router;
module.exports = function(router, passport) {
    // GET home page.
    router.get('/', home_controller.index);

    //accounts routes
    router.get('/accounts', accounts_controller.accounts_list);
    router.get('/accounts/delete/:id', accounts_controller.accounts_delete);
    router.post('/accounts/delete/:id', accounts_controller.accounts_delete_post);
    router.get('/accounts/detail/:id', accounts_controller.accounts_detail);

    //categories routes
    router.get('/categories', categories_controller.categories_list);
    router.get('/categories/create', categories_controller.categories_create);
    router.post('/categories/create',categories_controller.categories_create_post);
    router.get('/categories/delete/:id', categories_controller.categories_delete);
    router.post('/categories/delete/:id', categories_controller.categories_delete_post);
    router.get('/categories/update/:id', categories_controller.categories_update);
    router.post('/categories/update/:id', categories_controller.categories_update_post);
    //product routes
    router.get('/products', products_controller.products_list);
    router.get('/products/category/:id', products_controller.products_list_cat);
    router.get('/products/create', products_controller.products_create);
    router.post('/products/create', products_controller.products_create_post);
    router.get('/products/delete/:id', products_controller.products_delete);
    router.post('/products/delete/:id', products_controller.products_delete_post);
    router.get('/products/update/:id', products_controller.products_update);
    router.post('/products/update/:id', products_controller.products_update_post);
    router.get('/products/detail/:id', products_controller.products_getdetail);
    //bestseller routes
    router.get('/bestseller', bestseller_controller.bestseller_list);
    //edit info admin routes
    router.get('/edit_info_admin', edit_info_admin_controller.index);
    router.get('/edit_info_admin/save', edit_info_admin_controller.edit_info_admin_save);
    router.get('/edit_info_admin/cancel', edit_info_admin_controller.edit_info_admin_canccel);
    //orders routes
    router.get('/orders', orders_controller.orders_list);
    router.get('/orders/delete', orders_controller.orders_delete_get);
    router.get('/orders/detail/:id', orders_controller.orders_getdetail);
    //statistics day routes
    router.get('/statistics_day', statistics_day_controller.statistics_day_list);
    router.get('/statistics_day/update', statistics_day_controller.statistics_day_update_get);
    //statistics month routes
    router.get('/statistics_month', statistics_month_controller.statistics_month_list);
    router.post('/statistics_month', statistics_month_controller.statistics_month_update);
    //statistics year routes
    router.get('/statistics_year', statistics_year_controller.statistics_year_list);
    router.get('/statistics_year/update', statistics_year_controller.statistics_year_update_get);
    //statistics week routes
    router.get('/statistics_week', statistics_week_controller.statistics_week_list);
    router.get('/statistics_week/update', statistics_week_controller.statistics_week_update_get);
    //statistics quarter routes
    router.get('/statistics_quarter', statistics_quarter_controller.statistics_quarter_list);
    router.get('/statistics_quarter/update', statistics_quarter_controller.statistics_quarter_update_get);
    //login routes
    router.get('/signin', login_controller.login_load);
    router.post('/signin', passport.authenticate('local-signin', {
        successRedirect : '/',
        failureRedirect : '/signin',
        failureFlash : true 
    }));
    router.get('/signup', login_controller.register_load);
    router.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/',
        failureRedirect : '/signup',
        failureFlash : true 
        
    }));
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
} 
