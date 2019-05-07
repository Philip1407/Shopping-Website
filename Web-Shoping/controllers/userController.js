//var user = require('../models/user');

// Display list of all users.
exports.user_list = function(req, res) {
    res.send('NOT IMPLEMENTED: user list');
};

// Display detail page for a specific user.
exports.user_detail = function(req, res) {
    //res.send('NOT IMPLEMENTED: user detail: ' + req.params.id);
    res.render('users/account', { title: 'Tài khoản'});
};

// Display user create form on GET.
exports.user_create_get = function(req, res) {
    res.render('users/signin', { title: 'Đăng ký'});
};

// Handle user create on POST.
exports.user_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: user create POST');
};


// Display user update form on GET.
exports.user_update_get = function(req, res) {
    res.render('users/edit', { title: 'Chỉnh sửa thông tin'});
};

// Handle user update on POST.
exports.user_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED');
};

exports.user_login_get = function(req, res) {
    res.render('users/login', { title: 'Đăng Nhập' ,layout: 'users/login'});
};
exports.user_login_post = function(req, res) {
    res.send('NOT IMPLEMENTED');
};
exports.user_forgetpass_get = function(req, res) {
    res.render('users/forgotpassword', { title: 'Quên mật khẩu' ,layout: 'users/forgotpassword'});
};
exports.user_forgetpass_post = function(req, res) {
    res.send('NOT IMPLEMENTED');
};
