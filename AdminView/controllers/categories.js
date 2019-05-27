var Category = require('../models/catergories');
var Product = require('../models/products');
var async = require('async');



exports.categories_list = async function(req, res){
  var result=null;
  setTimeout(function(){
    res.render('categories/categories', { title: 'Quản lý gian hàng',list_categories: result, admin:req.user});
  },10000);

  var result = await Category.find();
  result.forEach( async element => {
          element['amount'] = await Product.countDocuments({'catergory': element._id})
  });
};

// Display categories create form on GET.
exports.categories_create = function(req, res) {
  res.render('categories/categories_create', { title: 'Thêm gian hàng', admin:req.user});
};

//Handle categories create on POST.
exports.categories_create_post = function(req, res) {
  Category.findOne({ 'name': req.body.name })
          .exec( function(err, found_category) {
              if (err) { return next(err); }
              if (found_category) {
                  res.redirect('/categories');
              }
              else {
                category = new Category({
                  name: req.body.name,
                });
                category.save(function (err) {
                if (err) { return next(err); }
                // category saved. Redirect to category detail page.
                res.redirect('/categories');
              });
            }
    });
};

// Display categories delete form on GET.
exports.categories_delete = async function(req, res) {
  var found_category = await Category.findOne({'_id': req.params.id})
  res.render('categories/categories_delete', { title: 'Xóa loại hàng',category:found_category, admin:req.user});
};

// Handle categories delete on POST.
exports.categories_delete_post = async function(req, res) {
  await Category.deleteOne({'_id':req.params.id})
  res.redirect('/categories');
};

// Display categories update form on GET.
exports.categories_update = async function(req, res) {
  var found_category = await Category.findOne({'_id': req.params.id})
  res.render('categories/categories_update', { title: 'Cập nhật loại hàng',category:found_category, admin:req.user});
};

// Handle categories update on POST.
exports.categories_update_post = async function(req, res) {
  await Category.findByIdAndUpdate(req.params.id,req.body);
  res.redirect('/categories');
};

