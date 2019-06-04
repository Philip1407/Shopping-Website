var Product = require('../models/products');
var Category = require('../models/catergories');
var User = require('../models/users');


const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

var async = require('async');
exports.index = function(req, res) {
    async.parallel({
        products: function(callback){
            Product.find().exec(callback);
        },
        categories: function(callback){
            Category.find().exec(callback);
        }
    },function(err, results) {
        if (err) { return next(err); }
        res.render('products/home', { title: 'Trang chủ',products:results.products,categories:results.categories, user:req.user});
    });
};

exports.home_search = function(req, res) {
    if(req.body.search=="") {
        res.redirect('/');
    }
    else {
        async.parallel({
            products: function(callback){
                Product.find({"name": {$regex: new RegExp(".*"+req.body.search+".*", "i")}}).exec(callback);
            },
            categories: function(callback){
                Category.find().exec(callback);
            }
        },function(err, results) {
            if (err) { return next(err); }
            var notfound = null;
            var found=null;
            if(results.products == 0){
                notfound = 'Không tìm thấy sản phẩm phù hợp với từ khóa \"' + req.body.search + '\".';
            }
            else {
                 found= 'Các sản phẩm phù hợp với từ khóa \"' + req.body.search + '\".';
            }
            res.render('products/home', { title: 'Trang chủ',products:results.products,categories:results.categories,none:notfound,done:found, textSearch:req.body.search,user:req.user});
        });
    }
};

// Display list of all products.
exports.product_list = function(req, res) {
    async.parallel({
        products: function(callback){
            Product.find().exec(callback);
        },
        categories: function(callback){
            Category.find().exec(callback);
        }
    },function(err, results) {
        if (err) { return next(err); }
        res.render('products/product', { title: 'Sản phẩm',products:results.products,categories:results.categories, user:req.user});
    });
};

// Display detail page for a specific product.
exports.product_detail = function(req, res) {
    Product.findById(req.params.id).exec(function(err, product) {
        if (err) { return next(err); }
        async.parallel({
            category: function(callback) {
                Category.findById(product.catergory).exec(callback);
            },
            productRelate: function(callback){
                Product.find({'catergory': product.catergory}).exec(callback);
            },
        },function(err, results) {
            if (err) { return next(err); }
            res.render('products/product-detail', {title: 'Chi tiết mặt hàng',item:  product, category: results.category, productRelates:results.productRelate, user:req.user } );
        });
    });
};
// Display list of all products.
exports.product_search = function(req, res) {
    if(req.body.search=="") {
        res.redirect('/product');
    }
    else {
        async.parallel({
            products: function(callback){
                Product.find({"name": {$regex: new RegExp(".*"+req.body.search+".*", "i")}}).exec(callback);
            },
            categories: function(callback){
                Category.find().exec(callback);
            }
        },function(err, results) {
            if (err) { return next(err); }
            var notfound = null;
            var found= null;
            if(results.products == 0){
                notfound = 'Không tìm thấy sản phẩm phù hợp với từ khóa \"' + req.body.search + '\".';
            }
            else {
                found= 'Các sản phẩm phù hợp với từ khóa \"' + req.body.search + '\".';
           }
            res.render('products/product', { title: 'Sản Phẩm',products:results.products,categories:results.categories,none:notfound,done:found, textSearch:req.body.search, user:req.user});
        });
    }
};



exports.product_sort_home = function(req, res) {
    var s  = req.params.type=="asc"?1:-1
    async.parallel({
        products: function(callback){
            Product.find().sort({"price":s}).exec(callback);
        },
        categories: function(callback){
            Category.find().exec(callback);
        }
    },function(err, results) {
        if (err) { return next(err); }
        res.render('products/home', { title: 'Trang chủ',products:results.products,categories:results.categories, user:req.user});
    });
};

exports.product_sort = function(req, res) {
    var s  = req.params.type=="asc"?1:-1
    async.parallel({
        products: function(callback){
            Product.find().sort({"price":s}).exec(callback);
        },
        categories: function(callback){
            Category.find().exec(callback);
        }
    },function(err, results) {
        if (err) { return next(err); }
        res.render('products/product', { title: 'Sản phẩm',products:results.products,categories:results.categories, user:req.user});
    });
};

exports.product_add_to_cart = function(req, res) {
    console.log(req.user.cart);
    if (req.user.cart==null) {
        User.findByIdAndUpdate(req.user._id,{cart:[]});
    }
    User.findByIdAndUpdate(req.user._id, 
        {$push: {cart: [{product: req.params.id, amount: req.body.num}]}},
        {safe: true, upsert: true},
        function(err, doc) {
            if(err){
            console.log(err);
            }else{
            //do stuff
            }
        }
    );
    setTimeout(function(){
      res.render('orders/orders_detail', { title: 'Chi tiết đơn hàng', data:order, total:total, admin:req.user}); 
    },10000);
    order['date'] = formatDate(order.day);
    User.findOne({_id: order.custom},{_id:0, username:1}).exec().then((name)=>{
      order['customName']=name['username'];
    }).catch((err) => {
      console.log(err);
    });

    order.products.forEach( element => {
      return Product.findOne({_id:element.product},{ _id:0, name:1, price:1, }).exec().then((result) => {
        
        total+= element.amount*result['price'];
        element.product = result['name'];
        element['price']=result['price'];
       // console.log(element['total']);
      }).catch((err) => {
        console.log(err);
      });
    });
    res.redirect('/product/detail/'+req.params.id);
}