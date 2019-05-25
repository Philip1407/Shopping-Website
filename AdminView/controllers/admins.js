var Admin= require('../models/admins');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.login_load = function(req, res, next) {
    res.render('admins/signin', { title: 'Đăng nhập', layout:false});
};

exports.register_load = function(req, res, next) {
    res.render('admins/signup', { title: 'Đăng ký', layout:false});
};
