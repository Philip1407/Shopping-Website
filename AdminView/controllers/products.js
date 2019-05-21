var Category = require('../models/catergories');
var Product = require('../models/products');
var async = require('async');

  exports.products_list = function(req, res){
    Product.find({},function(err,result){
      if(err){return next(err);} 
      res.render('products/products', { title: 'Quản lý sản phẩm',list_products: result});
    });
  };

  exports.products_list_cat = function(req, res, next){
    var category="";
    Category.findOne({_id:req.params.id},{ _id:0, name: 1}).exec().then((result) => {
      category=result['name'];
      Product.find({'catergory':req.params.id},function(err,result){
        if(err){return next(err);} 
        console.log(category);
        console.log("finish");
        res.render('products/products', { title: 'Quản lý sản phẩm',list_products: result, cattitle:'Sản phẩm thuộc loại', categoryName: category});
      });
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
    Productduct.findOne({'name':req.body.name}, function(err, found){
      if(err){return next(err)};
      if(found){
        res.redirect('/product');
      }else{
        var product = new Product(
          { name: req.body.name,
            img: req.body.linkImg,
            price: req.body.price,
            amount: req.body.amount,
            size: req.body.size,
            color:req.body.color,
            description:req.body.descript,
            catergory: req.body.category
          });
          product.save(function (err) {
            if (err) { return next(err); }
            res.redirect('/products');
          });
      }
    })
  }
  
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
            res.redirect('/products');
          })
  };
  
  // Display products update form on GET.
  exports.products_update = function(req, res) {
    Product.findOne({'_id':req.params.id})
          .exec(function(err,result){
            if(err){return next(err);}
            Category.find()
                    .exec(function(err,result1){
                        if(err){return next(err);}
                        res.render('products/products_update', { title: 'Chỉnh sửa sản phẩm',product:result,catergories:result1});
                    });
          })
    
  };
  
  // Handle products update on POST.
  exports.products_update_post = function(req, res) {
      Product.findByIdAndUpdate(req.params.id,req.body)
      .exec(function(err,result){
        if(err){return next(err);}
        res.redirect('/products');
      });
  };

  exports.products_getdetail = async function(req,res) {
    var result = await Product.findById(req.params.id);
    var result2 = await Category.findById(result.catergory);
    res.render('products/products_detail', { title: 'Chỉnh sửa sản phẩm',product: result, category: result2});
  };