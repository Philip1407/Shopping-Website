var Category = require('../models/catergories');
var Product = require('../models/products');
var async = require('async');

  exports.products_list = function(req, res){
    res.render('products/products', { title: 'Quản lý sản phẩm'});
  };

  exports.products_list_cat = function(req, res){
    Product.find({'catergory':req.params.id},function(err,result){
      if(err){return next(err);} 
      res.render('products/products', { title: 'Quản lý sản phẩm',list_products: result});
    });
  };
  // Display products create form on GET.
  exports.products_create = function(req, res) {
    Category.find()
            .exec(function(err, results) {
              if (err) { return next(err); }
              res.render('products/products_create', { title: 'Thêm sản phẩm',catergories:results});
            });
  };
  
  // Handle products create on POST.
  exports.products_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: products create POST');
  };
  
  // Display products delete form on GET.
  exports.products_delete = function(req, res) {
    Product.findOne({'_id':req.params.id},function(err,result){
      if(err){return next(err);} 
      res.render('products/products_delete', { title: 'Xóa sản phẩm',product:result});
    });
  };
  
  // Handle products delete on POST.
  exports.products_delete_post = function(req, res) {
    Product.deleteOne({'_id':req.params.id})
          .exec(function(err,result){
            if(err){return next(err);}
            window.history.back();
          })
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