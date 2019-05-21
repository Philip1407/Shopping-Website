var User = require('../models/users');


exports.accounts_list = function(req, res, next) {
  User.find({},function(err,result){
    if(err){return console.log(err);} 
    res.render('accounts/accounts', { title: 'Quản lý tài khoản người dùng',list_users: result});
  });
    
};

  exports.accounts_delete = function(req, res) {
    User.findOne({'_id':req.params.id},function(err,result){
      if(err){return console.log(err);} 
      res.render('accounts/accounts_delete', { title: 'Xóa tài khoản người dùng', user:result});
    });
  };

  exports.accounts_delete_post = function(req, res) {
    User.deleteOne({'_id':req.params.id})
          .exec(function(err,result){
            if(err){return console.log(err);}
            res.redirect('/accounts');
          })
  };

  exports.accounts_detail = async function(req, res) {
    var result = await User.findById(req.params.id);
    res.render('accounts/accounts_detail', { title: 'Xóa tài khoản người dùng', user:result});
  };
  
  