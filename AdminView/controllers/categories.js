var Category = require('../models/catergories');
var Product = require('../models/products');
var async = require('async');

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.categories_list = function(req, res){
  Category.find()
    .sort([['name', 'ascending']])
    .exec(function (err, list_categories) {
      if (err) { return next(err); }
      // Successful, so render.
      res.render('categories/categories', { title: 'Quản lý gian hàng',list_categories: list_categories});
    });
};

// Display categories create form on GET.
exports.categories_create = function(req, res) {
  res.render('categories/categories_create', { title: 'Thêm gian hàng'});
};

//Handle categories create on POST.
exports.categories_create_post = function(req, res) {
  Category.findOne({ 'name': req.body.name })
          .exec( function(err, found_category) {
              if (err) { return next(err); }
              if (found_category) {
                   // category exists, redirect to its detail page.
                  // res.redirect(found_category.url);
                  res.redirect('/categories');
              }
              else {
                category.save(function (err) {
                if (err) { return next(err); }
                // category saved. Redirect to category detail page.
                res.redirect('/categories');
              });
            }
    });
};

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
