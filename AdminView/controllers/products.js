//var products = require('..\views\products');

  exports.products_list = function(req, res){
    res.render('products/products', { title: 'Quản lý sản phẩm'});
  };

  // Display products create form on GET.
  exports.products_create = function(req, res) {
    res.render('products/products_create', { title: 'Thêm sản phẩm'});
  };
  
  // Handle products create on POST.
  exports.products_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: products create POST');
  };
  
  // Display products delete form on GET.
  exports.products_delete = function(req, res) {
    res.render('products/products_delete', { title: 'Xóa sản phẩm'});
  };
  
  // Handle products delete on POST.
  exports.products_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: products delete POST');
  };
  
  // Display products update form on GET.
  exports.products_update = function(req, res) {
    res.render('products/products_update', { title: 'Chỉnh sửa sản phẩm'});
  };
  
  // Handle products update on POST.
  exports.products_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: products update POST');
  };

  exports.products_getdetail = function(req,res) {
    res.render('products/products_detail', { title: 'Chỉnh sửa sản phẩm'});
  };