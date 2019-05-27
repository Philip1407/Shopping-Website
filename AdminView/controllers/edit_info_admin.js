//var edit_info_admin = require('..\views\edit_info_admin');

exports.index = function(req, res){
    res.render('edit_info_admin/edit_info_admin', { title: 'Chỉnh sửa thông tin', admin:req.user});
  };

  exports.edit_info_admin_save = function(req, res) {
    res.render('index', {title: 'Thông tin chung', admin:req.user});
  };
  
  // Handle products create on POST.
  exports.edit_info_admin_canccel = function(req, res) {
    res.render('index', {title: 'Thông tin chung', admin:req.user});
  };
  