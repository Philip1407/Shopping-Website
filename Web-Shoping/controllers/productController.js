var Product = require('../models/products');
var Category = require('../models/catergories');


const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

var async = require('async');
exports.index = function(req, res) {
    res.render('products/home', { title: 'Trang chủ' });
};

// Display list of all products.
exports.product_list = function(req, res) {
        Product.find({}).exec(function (err, products) {
            if (err) { return next(err); }
            Category.find({}).exec(function(err,categories){
                if (err) { return next(err); }
                res.render('products/product', { title: 'Sản phẩm',products:products,categories:categories});
            });
        });
};

// Display detail page for a specific product.
exports.product_detail = function(req, res) {
    res.render('products/product-detail', {title: 'Chi tiết mặt hàng'});
};

// Display product create form on GET.
exports.product_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: product create GET');
};

