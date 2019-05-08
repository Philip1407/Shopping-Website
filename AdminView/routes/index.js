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

// GET home page.
router.get('/', home_controller.index);

//accounts routes
router.get('/accounts', accounts_controller.accounts_list);
router.get('/accounts/delete', accounts_controller.accounts_delete);

//categories routes
router.get('/categories', categories_controller.categories_list);
router.get('/categories/create', categories_controller.categories_create);
router.get('/categories/delete', categories_controller.categories_delete);
router.get('/categories/update', categories_controller.categories_update);
//product routes
router.get('/products', products_controller.products_list);
router.get('/products/create', products_controller.products_create);
router.get('/products/delete', products_controller.products_delete);
router.get('/products/update', products_controller.products_update);
router.get('/products/detail', products_controller.products_getdetail);
//bestseller routes
router.get('/bestseller', bestseller_controller.bestseller_list);
//edit info admin routes
router.get('/edit_info_admin', edit_info_admin_controller.index);
router.get('/edit_info_admin/save', edit_info_admin_controller.edit_info_admin_save);
router.get('/edit_info_admin/cancel', edit_info_admin_controller.edit_info_admin_canccel);
//orders routes
router.get('/orders', orders_controller.orders_list);
router.get('/orders/delete', orders_controller.orders_delete_get);
router.get('/orders/detail', orders_controller.orders_getdetail);
//statistics day routes
router.get('/statistics_day', statistics_day_controller.statistics_day_list);
router.get('/statistics_day/update', statistics_day_controller.statistics_day_update_get);
router.get('/statistics_day/update', statistics_day_controller.statistics_day_update_post);
//statistics month routes
router.get('/statistics_month', statistics_month_controller.statistics_month_list);
router.get('/statistics_month/update', statistics_month_controller.statistics_month_update_get);
router.get('/statistics_month/update', statistics_month_controller.statistics_month_update_post);
//statistics year routes
router.get('/statistics_year', statistics_year_controller.statistics_year_list);
router.get('/statistics_year/update', statistics_year_controller.statistics_year_update_get);
router.get('/statistics_year/update', statistics_year_controller.statistics_year_update_post);
//statistics week routes
router.get('/statistics_week', statistics_week_controller.statistics_week_list);
router.get('/statistics_week/update', statistics_week_controller.statistics_week_update_get);
router.get('/statistics_week/update', statistics_week_controller.statistics_week_update_post);
//statistics quarter routes
router.get('/statistics_quarter', statistics_quarter_controller.statistics_quarter_list);
router.get('/statistics_quarter/update', statistics_quarter_controller.statistics_quarter_update_get);
router.get('/statistics_quarter/update', statistics_quarter_controller.statistics_quarter_update_post);

module.exports = router;
