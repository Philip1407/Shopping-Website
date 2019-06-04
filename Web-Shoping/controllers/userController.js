var User = require('../models/users');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
var nodemailer = require('nodemailer');
var async = require('async');
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
    var user = req.user;
    var datebirth = user.birthday.getDate();
    if(user.birthday.getDate()<10){
        datebirth = '0' + datebirth;
    }
    var birth = user.birthday.getFullYear()+'-'+ month[user.birthday.getMonth()] + '-' + datebirth;
    res.render('users/account', { title: 'Tài khoản',user : user,birth:birth});
};

// Display user create form on GET.
exports.user_create_get = function(req, res) {
    res.render('users/signin', { title: 'Đăng ký'});
};
exports.user_logout_get = function(req, res) {
    req.logout();
    res.redirect('/');
};

// Display user update form on GET.
exports.user_update_get = function(req, res) {
    var month = [
        "01", "02", "03",
        "04", "05", "06", "07",
        "08", "09", "10",
        "11", "12"
      ];
      var user = req.user;
      var datebirth = user.birthday.getDate();
      if(user.birthday.getDate()<10){
          datebirth = '0' + datebirth;
      }
      var birth = user.birthday.getFullYear()+'-'+ month[user.birthday.getMonth()] + '-' + datebirth;
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

exports.user_forgetpass_get = function(req, res) {
    res.render('users/forgotpassword', { title: 'Quên mật khẩu' ,layout: 'users/forgotpassword'});
};
exports.user_forgetpass_post = function(req, res) {
    async.waterfall([
        function(done) {
          crypto.randomBytes(20, function(err, buf) {
            var token = buf.toString('hex');
            done(err, token);
          });
        },
        function(token, done) {
          User.findOne({ email: req.body.email }, function(err, user) {
            if (!user) {
                req.session.sessionFlash = {
                    type: 'error',
                    message: 'Email không tồn tại.'
                }
              return res.redirect('/forgotpassword');
            }
    
            user.resetPasswordToken = token;
            user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    
            user.save(function(err) {
              done(err, token, user);
            });
          });
        },
        function(token, user, done) {
          var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'team384440470@gmail.com',
                pass: '384440470'
            }
          });
      
          console.log('created');
          req.session.sessionFlash = { type: 'success',message: 'An e-mail has been sent to ' + user.email + ' with further instructions.'};
          transporter.sendMail({
            from: 'team384440470@gmail.com',
            to: user.email,
            subject: 'Node.js Password Reset',
            text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                  'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                  'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                  'If you did not request this, please ignore this email and your password will remain unchanged.\n'
          });
          return res.redirect('/forgotpassword');
        }
      ], function(err) {
        if (err) console.log(err);
        res.redirect('/forgotpassword');
      });
};
exports.user_change_pass = function(req, res) {
    res.render('users/changepass',{title:'Thay Đổi Mật Khẩu'})
};
exports.user_change_pass_post = async function(req, res) {
    if(!await bcrypt.compare(req.body.pass,req.user.pass))
      res.render('users/changepass',{title:'Thay Đổi Mật Khẩu',message:'Mật khẩu sai'});
    else{
      if(req.body.newpass != req.body.repass)
        res.render('users/changepass',{title:'Thay Đổi Mật Khẩu',message:' Mật khẩu nhập lại không khớp'});
      else{
          var password = await bcrypt.hash(req.body.newpass, 10);
          await User.findByIdAndUpdate(req.user._id,{$set: {pass: password}});
          res.redirect("/");
      }
    }
};



exports.user_reset_get = async function(req, res) {
  var user = await User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } })
  if (!user) {
    req.session.sessionFlash = {
      type: 'error',
      message: 'Password reset token is invalid or has expired.'
    }
    return res.redirect('/forgotpassword');
  }
  res.render('users/resetpass',{user:user});
};

exports.user_reset_post = async function(req, res) {
  var url = '/reset/'+ req.params.token;
  var user = await User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } })
  if (!user) {
    req.session.sessionFlash = {
      type: 'error',
      message: 'Password reset token is invalid or has expired.'
    }
    return res.redirect(url);
  }
  if(req.body.newpass!=req.body.repass){
    req.session.sessionFlash = {
      type: 'error',
      message: 'Mật khẩu nhập lại sai'
    }
    return res.redirect(url);
  }
  else{
    var password = await bcrypt.hash(req.body.newpass, 10);
    await User.findByIdAndUpdate(user._id,{$set: {pass: password}});
    return res.redirect('/login');
  }
};
