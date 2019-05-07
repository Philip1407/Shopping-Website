//var product = require('../models/product');

exports.index = function(req, res) {
    res.render('products/home', { title: 'Trang chủ' });
};

// Display list of all products.
exports.product_list = function(req, res) {
    res.render('products/product', { title: 'Sản phẩm'});
};

// Display detail page for a specific product.
exports.product_detail = function(req, res) {
    //res.send('NOT IMPLEMENTED: product detail: ' + req.params.id);
    res.render('products/product-detail', {title: 'Chi tiết mặt hàng'});
};

// Display product create form on GET.
exports.product_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: product create GET');
};

