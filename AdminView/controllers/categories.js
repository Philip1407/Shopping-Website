//var categories = require('..\views\categories');

exports.categories_list = function(req, res){
    res.render('categories/categories', { title: 'Quản lý gian hàng'});
};

// Display categories create form on GET.
exports.categories_create = function(req, res) {
  res.render('categories/categories_create', { title: 'Thêm gian hàng'});
};
/*
// Handle categories create on POST.
exports.categories_create_post = function(req, res) {
  res.send('NOT IMPLEMENTED: categories create POST');
};
*/
// Display categories delete form on GET.
exports.categories_delete = function(req, res) {
  res.render('categories/categories_delete', { title: 'Xóa gian hàng'});
};
/*
// Handle categories delete on POST.
exports.categories_delete_post = function(req, res) {
  res.send('NOT IMPLEMENTED: categories delete POST');
};
*/
// Display categories update form on GET.
exports.categories_update = function(req, res) {
  res.render('categories/categories_update', { title: 'Chỉnh sửa gian hàng'});
};
/*
// Handle categories update on POST.
exports.categories_update_post = function(req, res) {
  res.send('NOT IMPLEMENTED: categories update POST');
};
*/
