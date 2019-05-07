//var cart = require('../models/cart');

// Display list of all carts.
exports.cart_list = function(req, res) {
    res.render('cart/history', {title: 'Lịch sử đơn hàng'});
};
// Display cart update form on GET.
exports.cart_update_get = function(req, res) {
    res.render('cart/shoppingcart', { title: 'Giỏ hàng'});
};

// Handle cart update on POST.
exports.cart_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: cart update POST');
};

// // Display detail page for a specific cart.
// exports.cart_detail = function(req, res) {
//     res.send('NOT IMPLEMENTED: cart detail: ' + req.params.id);
// };

// // Display cart create form on GET.
// exports.cart_create_get = function(req, res) {
//     res.send('NOT IMPLEMENTED: cart create GET');
// };

// // Handle cart create on POST.
// exports.cart_create_post = function(req, res) {
//     res.send('NOT IMPLEMENTED: cart create POST');
// };

// // Display cart delete form on GET.
// exports.cart_delete_get = function(req, res) {
//     res.send('NOT IMPLEMENTED: cart delete GET');
// };

// // Handle cart delete on POST.
// exports.cart_delete_post = function(req, res) {
//     res.send('NOT IMPLEMENTED: cart delete POST');
// };

