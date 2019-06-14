var express = require('express');
var router = express.Router();

var home_controller = require('../controllers/home');
var accounts_controller = require('../controllers/accounts');
var categories_controller = require('../controllers/categories');
var products_controller = require('../controllers/products');
var bestseller_controller = require('../controllers/bestseller');
var orders_controller = require('../controllers/orders');
var statistics_day_controller = require('../controllers/statistics_day');
var statistics_month_controller = require('../controllers/statistics_month');
var statistics_week_controller = require('../controllers/statistics_week');
var statistics_quarter_controller = require('../controllers/statistics_quarter');
var statistics_year_controller = require('../controllers/statistics_year');
var admin_controller=require('../controllers/admins');



module.exports = router;
module.exports = function(router, passport,parser) {
    // GET home page.
    router.get('/home', isLoggedIn, home_controller.index);

    //accounts routes
    router.get('/accounts',accounts_controller.accounts_list);
   
    router.get('/accounts/delete/:id',isLoggedIn, accounts_controller.accounts_delete);
    router.post('/accounts/delete/:id',isLoggedIn, accounts_controller.accounts_delete_post);
    router.get('/accounts/detail/:id',isLoggedIn, accounts_controller.accounts_detail);
    router.get('/accounts/lock/:id',accounts_controller.accounts_lock_get);
    router.get('/accounts/unlock/:id',accounts_controller.accounts_unlock_get);
    router.post('/accounts/lock/:id',accounts_controller.accounts_lock);
    router.post('/accounts/unlock/:id',accounts_controller.accounts_unlock);
    router.get('/accounts/:page',accounts_controller.accounts_list);
    //categories routes
    router.get('/categories', categories_controller.categories_list);
    router.get('/categories/create',isLoggedIn, categories_controller.categories_create);
    router.post('/categories/create',isLoggedIn,categories_controller.categories_create_post);
    router.get('/categories/delete/:id', isLoggedIn,categories_controller.categories_delete);
    router.post('/categories/delete/:id', isLoggedIn,categories_controller.categories_delete_post);
    router.get('/categories/update/:id', isLoggedIn,categories_controller.categories_update);
    router.post('/categories/update/:id', isLoggedIn,categories_controller.categories_update_post);
    //product routes
    router.get('/products',products_controller.products_list);
    router.get('/products/category/:id', isLoggedIn,products_controller.products_list_cat);
    router.get('/products/create', products_controller.products_create);
    router.post('/products/create',parser.single("image"),products_controller.products_create_post);
    router.get('/products/delete/:id',isLoggedIn, products_controller.products_delete);
    router.post('/products/delete/:id',isLoggedIn, products_controller.products_delete_post);
    router.get('/products/update/:id', products_controller.products_update);
    router.post('/products/update/:id',parser.single("image"), products_controller.products_update_post);
    router.get('/products/detail/:id',isLoggedIn, products_controller.products_getdetail);
    router.get('/products/:page',products_controller.products_list);
    //bestseller routes
    router.get('/bestseller', isLoggedIn,bestseller_controller.bestseller_list);
    //orders routes
    router.get('/orders', isLoggedIn,orders_controller.orders_list);
    router.get('/orders/delete', isLoggedIn,orders_controller.orders_delete_get);
    router.get('/orders/detail/:id', isLoggedIn,orders_controller.orders_getdetail);
    //statistics day routes
    router.get('/statistics_day', isLoggedIn,statistics_day_controller.statistics_day_list);
    router.get('/statistics_day/update', isLoggedIn,statistics_day_controller.statistics_day_update_get);
    //statistics month routes
    router.get('/statistics_month', isLoggedIn,statistics_month_controller.statistics_month_list);
    router.post('/statistics_month', isLoggedIn,statistics_month_controller.statistics_month_update);
    //statistics year routes
    router.get('/statistics_year', isLoggedIn,statistics_year_controller.statistics_year_list);
    router.get('/statistics_year/update',isLoggedIn, statistics_year_controller.statistics_year_update_get);
    //statistics week routes
    router.get('/statistics_week',isLoggedIn, statistics_week_controller.statistics_week_list);
    router.get('/statistics_week/update',isLoggedIn, statistics_week_controller.statistics_week_update_get);
    //statistics quarter routes
    router.get('/statistics_quarter', isLoggedIn,statistics_quarter_controller.statistics_quarter_list);
    router.get('/statistics_quarter/update',isLoggedIn, statistics_quarter_controller.statistics_quarter_update_get);
    //admins controller
    router.get('/admins',isLoggedIn,admin_controller.admins_list);
    router.get('/admins/edit_info', isLoggedIn, admin_controller.edit_info_admin)
    router.post('/admins/edit_info', admin_controller.edit_info_admin_post);
    router.get('/admins/detail/:id',isLoggedIn, admin_controller.admins_detail);
    router.get('/signout',isLoggedIn,admin_controller.signout);
    router.get('/changepass',isLoggedIn,admin_controller.changepass);
    router.post('/changepass',isLoggedIn,admin_controller.changepass_post);
    //admin routes
    router.get('/', admin_controller.login_load);
    router.post('/', passport.authenticate('local-signin', {
      successRedirect : '/home',
      failureRedirect : '/',
      failureFlash : true 
  }));
    router.get('/signup', admin_controller.register_load);
    router.post('/signup', passport.authenticate('local-signup', {
      successRedirect : '/home',
      failureRedirect : '/signup',
      failureFlash : true 
  }));
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
} 
