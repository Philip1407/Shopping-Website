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
    if(req.body.search=="") {
        res.redirect('/');
    }
    else {
        async.parallel({
            products: function(callback){
                Product.find({"name": {$regex: new RegExp(".*"+req.body.search+".*", "i")}}).exec(callback);
            },
            categories: function(callback){
                Category.find().exec(callback);
            }
        },function(err, results) {
            if (err) { return next(err); }
            var notfound = null;
            var found=null;
            if(results.products == 0){
                notfound = 'Không tìm thấy sản phẩm phù hợp với từ khóa \"' + req.body.search + '\".';
            }
            else {
                 found= 'Các sản phẩm phù hợp với từ khóa \"' + req.body.search + '\".';
            }
            res.render('products/home', { title: 'Trang chủ',products:results.products,categories:results.categories,none:notfound,done:found, textSearch:req.body.search,});
        });
    }
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
    if(req.body.search=="") {
        res.redirect('/product');
    }
    else {
        async.parallel({
            products: function(callback){
                Product.find({"name": {$regex: new RegExp(".*"+req.body.search+".*", "i")}}).exec(callback);
            },
            categories: function(callback){
                Category.find().exec(callback);
            }
        },function(err, results) {
            if (err) { return next(err); }
            var notfound = null;
            var found= null;
            if(results.products == 0){
                notfound = 'Không tìm thấy sản phẩm phù hợp với từ khóa \"' + req.body.search + '\".';
            }
            else {
                found= 'Các sản phẩm phù hợp với từ khóa \"' + req.body.search + '\".';
           }
            res.render('products/product', { title: 'Sản Phẩm',products:results.products,categories:results.categories,none:notfound,done:found, textSearch:req.body.search});
        });
    }
};



exports.product_sort_home = function(req, res) {
    var s  = req.params.type=="asc"?1:-1
    async.parallel({
        products: function(callback){
            Product.find().sort({"price":s}).exec(callback);
        },
        categories: function(callback){
            Category.find().exec(callback);
        }
    },function(err, results) {
        if (err) { return next(err); }
        res.render('products/home', { title: 'Trang chủ',products:results.products,categories:results.categories});
    });
};

exports.product_sort = function(req, res) {
    var s  = req.params.type=="asc"?1:-1
    async.parallel({
        products: function(callback){
            Product.find().sort({"price":s}).exec(callback);
        },
        categories: function(callback){
            Category.find().exec(callback);
        }
    },function(err, results) {
        if (err) { return next(err); }
        res.render('products/product', { title: 'Sản phẩm',products:results.products,categories:results.categories});
    });
};