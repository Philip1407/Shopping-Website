exports.accounts_list = function(req, res, next) {
    res.render('accounts/accounts', { title: 'Quản lý tài khoản người dùng'});
};

  exports.accounts_delete = function(req, res) {
    res.render('accounts/accounts_delete', { title: 'Xóa tài khoản người dùng'});
  };
  