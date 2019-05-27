var Admin= require('../models/admins');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.login_load = function(req, res, next) {
    res.render('admins/signin', { title: 'Đăng nhập', layout:false});
};

exports.register_load = function(req, res, next) {
    res.render('admins/signup', { title: 'Đăng ký', layout:false});
};

exports.admins_list = function(req,res,next){
    Admin.find({},function(err,result){
        if(err){return console.log(err);} 
        res.render('admins/admins', { title: 'Danh sách quản trị viên',list_admins: result, admin:req.user});
      });
}

exports.admins_detail = async function(req,res,next){
    var month = [
        "01", "02", "03",
        "04", "05", "06", "07",
        "08", "09", "10",
        "11", "12"
      ];
      var result = await Admin.findById(req.params.id);
      if(result.birthday){
      var birth = result.birthday.getDate()+'/'+ month[result.birthday.getMonth()] + '/' + result.birthday.getFullYear();
      }
      res.render('admins/admins_detail', { title: 'Chi tiết quản trị viên', admin:result,birthday:birth});
}
