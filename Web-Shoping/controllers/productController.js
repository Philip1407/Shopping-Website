var Product = require('../models/products');
var Category = require('../models/catergories');


const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

var async = require('async');
exports.index = function(req, res) {
    async.parallel({
        products: function(callback){
            Product.find().exec(callback);
        },
        categories: function(callback){
            Category.find().exec(callback);
        }
    },function(err, results) {
        if (err) { return next(err); }
        res.render('products/home', { title: 'Trang chủ',products:results.products,categories:results.categories});
    });
};

exports.home_search = function(req, res) {
    async.parallel({
        products: function(callback){
            Product.find({"name": {$regex: new RegExp(".*"+req.body.search+".*", "i")}}).exec(callback);
        },
        categories: function(callback){
            Category.find().exec(callback);
        }
    },function(err, results) {
        if (err) { return next(err); }
        var none = null;
        if(results.products==null){
            none = 'Không tìm thấy sản phẩm'
        }
        res.render('products/home', { title: 'Trang chủ',products:results.products,categories:results.categories,none:none});
    });
};

// Display list of all products.
exports.product_list = function(req, res) {
    async.parallel({
        products: function(callback){
            Product.find().exec(callback);
        },
        categories: function(callback){
            Category.find().exec(callback);
        }
    },function(err, results) {
        if (err) { return next(err); }
        res.render('products/product', { title: 'Sản phẩm',products:results.products,categories:results.categories});
    });
};

// Display detail page for a specific product.
exports.product_detail = function(req, res) {
    Product.findById(req.params.id).exec(function(err, product) {
        if (err) { return next(err); }
        async.parallel({
            category: function(callback) {
                Category.findById(product.catergory).exec(callback);
            },
            productRelate: function(callback){
                Product.find({'catergory': product.catergory}).exec(callback);
            },
        },function(err, results) {
            if (err) { return next(err); }
            res.render('products/product-detail', {title: 'Chi tiết mặt hàng',item:  product, category: results.category, productRelates:results.productRelate } );
        });
    });
};
// Display list of all products.
exports.product_search = function(req, res) {
    async.parallel({
        products: function(callback){
            Product.find({"name": {$regex: new RegExp(".*"+req.body.search+".*", "i")}}).exec(callback);
        },
        categories: function(callback){
            Category.find().exec(callback);
        }
    },function(err, results) {
        if (err) { return next(err); }
        var none = null;
        if(results.products==null){
            none = 'Không tìm thấy sản phẩm'
        }
        res.render('products/product', { title: 'Sản phẩm',products:results.products,categories:results.categories,none:none});
    });
};



