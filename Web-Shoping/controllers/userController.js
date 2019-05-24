var User = require('../models/users');
const bcrypt = require('bcrypt');
const saltRounds = 10;
// Display list of all users.
exports.user_list = function(req, res) {
    res.send('NOT IMPLEMENTED: user list');
};

// Display detail page for a specific user.
exports.user_detail = function(req, res) {
    var month = [
        "01", "02", "03",
        "04", "05", "06", "07",
        "08", "09", "10",
        "11", "12"
      ];
    var result = req.user;
    var birth = result.birthday.getDate()+'/'+ month[result.birthday.getMonth()] + '/' + result.birthday.getFullYear() ;
    res.render('users/account', { title: 'Tài khoản',user : req.user,birth:birth});
};

// Display user create form on GET.
exports.user_create_get = function(req, res) {
    res.render('users/signin', { title: 'Đăng ký'});
};

// // Handle user create on POST.
// exports.user_create_post = async function(req, res, passport) {
//     passport.authenticate('local-signup', {
//         successRedirect : '/profile', // Điều hướng tới trang hiển thị profile
//         failureRedirect : '/signup', // Trở lại trang đăng ký nếu lỗi
//         failureFlash : true 
//     })
//     var result = await User.find({'email':req.body.email});
//     if(result.length != 0){
//         res.redirect('/');
//     }else{
//         if(req.body.pass !== req.body.repass)
//         {
//             res.redirect('/');
//         }
//         var hash = await bcrypt.hash(req.body.pass, saltRounds);
//         var user = new User({
//                             username: req.body.username,
//                             birthday: req.body.birthday,
//                             sex: req.body.sex,
//                             email: req.body.email,
//                             address: req.body.address,
//                             pass: hash,
//                             });
//         await user.save();
//         res.redirect('/')
//     }
// };


// Display user update form on GET.
exports.user_update_get = function(req, res) {
    var month = [
        "01", "02", "03",
        "04", "05", "06", "07",
        "08", "09", "10",
        "11", "12"
      ];
      var user = req.user;
      var birth = user.birthday.getFullYear()+'-'+ month[user.birthday.getMonth()] + '-' + user.birthday.getDate() ;
    res.render('users/edit', { title: 'Chỉnh sửa thông tin',user:user,birth:birth});
};

// Handle user update on POST.
exports.user_update_post = async function(req, res) {
    await User.findByIdAndUpdate(req.user._id,req.body);
    res.redirect('/myaccount');
};

exports.user_login_get = function(req, res) {
    res.render('users/login', { title: 'Đăng Nhập' ,layout: 'users/login'});
};
// exports.user_login_post = async function(req, res) {
//     var user = await User.findOne({ 'email' :  req.body.email });
//     if (!user)
//         return console.log('No user found.');
//     var result = await bcrypt.compare(req.body.pass, user.pass)
//     if (!result)
//         return console.log('Oops! Wrong password.');
//     res.redirect('/');
// };
exports.user_forgetpass_get = function(req, res) {
    res.render('users/forgotpassword', { title: 'Quên mật khẩu' ,layout: 'users/forgotpassword'});
};
exports.user_forgetpass_post = function(req, res) {
    res.send('NOT IMPLEMENTED');
};
