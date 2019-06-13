var Category = require('../models/catergories');
var Product = require('../models/products');
var async = require('async');

  exports.products_list = function(req, res){
    Product.find({},function(err,result){
      if(err){return console.log(err);} 
      res.render('products/products', { title: 'Quản lý sản phẩm',cattitle:'Quản lý sản phẩm',admin:req.user, list_products: result});
    });
  };
  exports.products_list = function(req, res) {
    var itemPerPage = 5;
    page = req.params.page?req.params.page:1;
    async.parallel({
        products: function(callback){
          Product.find()
            .skip((itemPerPage * page) - itemPerPage)
            .limit(itemPerPage)
            .exec(callback);
        },
        pageCount: function(callback){
          Product.countDocuments().exec(callback)
        }
    },function(err, results) {
        if (err) { return next(err); }
        var pageNum = Math.ceil(results. pageCount/itemPerPage);
        var page = [];
        for(var i = 1;i<=pageNum;i++){
            page.push(i);
        }
        var linkPage = '/products';  
        res.render('products/products', { title: 'Quản lý sản phẩm',cattitle:'Quản lý sản phẩm', linkPage:linkPage,page:page,admin:req.user, list_products: results.products});
    });
  };

  exports.products_list_cat = function(req, res, next){
    var category="";
    Category.findOne({_id:req.params.id},{ _id:0, name: 1}).exec().then((result) => {
      category=result['name'];
      Product.find({'catergory':req.params.id},function(err,result){
        if(err){return console.log(err);} 
        console.log(category);
        console.log("finish");
        res.render('products/products', { title: 'Quản lý sản phẩm',list_products: result, cattitle:'Sản phẩm thuộc loại', admin:req.user, categoryName: category});
      });
    });
  };
  // Display products create form on GET.
  exports.products_create = function(req, res) {
    Category.find()
            .exec(function(err, results) {
              if (err) { return console.log(err); }
              res.render('products/products_create', { title: 'Thêm sản phẩm',catergories:results, admin:req.user});
            });
  };
  
  // Handle products create on POST.
  exports.products_create_post = function(req, res) {
    Product.findOne({'name':req.body.name}, function(err, found){
      if(err){return console.log(err)};
      if(found){
        res.redirect('/products');
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
            if (err) { return console.log(err); }
            res.redirect('/products');
          });
      }
    })
  }
  
  // Display products delete form on GET.
  exports.products_delete = function(req, res) {
    Product.findOne({'_id':req.params.id},function(err,result){
      if(err){return console.log(err);} 
      res.render('products/products_delete', { title: 'Xóa sản phẩm',product:result, admin:req.user});
    });
  };
  
  // Handle products delete on POST.
  exports.products_delete_post = function(req, res) {
    Product.deleteOne({'_id':req.params.id})
          .exec(function(err,result){
            if(err){return console.log(err);}
            res.redirect('/products');
          })
  };
  
  // Display products update form on GET.
  exports.products_update = function(req, res) {
    Product.findOne({'_id':req.params.id})
          .exec(function(err,result){
            if(err){return console.log(err);}
            Category.find()
                    .exec(function(err,result1){
                        if(err){return console.log(err);}
                        res.render('products/products_update', { title: 'Chỉnh sửa sản phẩm',admin:req.user, product:result,catergories:result1});
                    });
          })
    
  };
  
  // Handle products update on POST.
  exports.products_update_post = function(req, res) {
      Product.findByIdAndUpdate(req.params.id,req.body)
      .exec(function(err,result){
        if(err){return console.log(err);}
        res.redirect('/products');
      });
  };

  exports.products_getdetail = async function(req,res) {
    var result = await Product.findById(req.params.id);
    var result2 = await Category.findById(result.catergory);
    res.render('products/products_detail', { title: 'Chỉnh sửa sản phẩm',product: result, category: result2, admin:req.user});
  };