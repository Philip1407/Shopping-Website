var Category = require('../models/catergories');
var Product = require('../models/products');
var async = require('async');



exports.categories_list = function(req, res){
  var result=null;
  setTimeout(function(){
    //console.log(result);
    res.render('categories/categories', { title: 'Quản lý gian hàng',list_categories: result});
  },10000);

  Category.find()
    .exec(function (err, list_categories) {
      if (err) { return next(err); }
      result = list_categories;
      result.forEach( element => {
        return Product.countDocuments({'catergory': element._id},function(err,result){
          if(err){return next(err);} 
            element['amount']=result;
        });
        });
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
exports.categories_delete = function(req, res) {
  Category.findOne({'_id': req.params.id})
          .exec(function(err,found_category){
            if(err){return next(err);}
            res.render('categories/categories_delete', { title: 'Xóa loại hàng',category:found_category});
          });
  
};

// Handle categories delete on POST.
exports.categories_delete_post = function(req, res) {
  Category.deleteOne({'_id':req.params.id})
          .exec(function(err,result){
            if(err){return next(err);}
            res.redirect('/categories');
          })
};

// Display categories update form on GET.
exports.categories_update = function(req, res) {
  Category.findOne({'_id': req.params.id})
  .exec(function(err,found_category){
    if(err){return next(err);}
    res.render('categories/categories_update', { title: 'Cập nhật loại hàng',category:found_category});
  });
};

// Handle categories update on POST.
exports.categories_update_post = function(req, res) {
  Category.findByIdAndUpdate(req.params.id,req.body)
          .exec(function(err,result){
            if(err){return next(err);}
            res.redirect('/categories');
          });
};

