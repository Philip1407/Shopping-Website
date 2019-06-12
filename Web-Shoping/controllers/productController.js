var Product = require('../models/products');
var Category = require('../models/catergories');
var User = require('../models/users');
var Review = require('../models/reviews');


var async = require('async');
exports.index = function(req, res) {
    var itemPerPage = 12;
    page = req.params.page?req.params.page:1;
    async.parallel({
        products: function(callback){
            Product.find()
                .skip((itemPerPage * page) - itemPerPage)
                .limit(itemPerPage)
                .exec(callback);
        },
        categories: function(callback){
            Category.find().exec(callback);
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
        res.render('products/home', { title: 'Sản phẩm',page:page,products:results.products,categories:results.categories, user:req.user});
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
    var itemPerPage = 12;
    page = req.params.page?req.params.page:1;
    async.parallel({
        products: function(callback){
            Product.find()
                .skip((itemPerPage * page) - itemPerPage)
                .limit(itemPerPage)
                .exec(callback);
        },
        categories: function(callback){
            Category.find().exec(callback);
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
        res.render('products/product', { title: 'Sản phẩm',page:page,products:results.products,categories:results.categories, user:req.user});
    });
};

// Display detail page for a specific product.
exports.product_detail = async function(req, res) {
    var itemPerPage = 10;
    page = req.params.page?req.params.page:1;
    var product  = await Product.findById(req.params.id);
    if(!product.watch){
        product.watch  = 1;
    }else{
        product.watch = product.watch + 1;
    }
    await product.save();
    async.parallel({
        category: function(callback) {
            Category.findById(product.catergory).exec(callback);
        },
        productRelate: function(callback){
            Product.find({'catergory': product.catergory}).exec(callback);
        },
        reviewPage:function(callback){
            Review.countDocuments({product: product._id}).exec(callback);
        },
        review:function(callback){
            Review.find({product: product._id})
                .skip((itemPerPage * page) - itemPerPage)
                .limit(itemPerPage)
                .exec(callback);
        }
    },function(err, results) {
        if (err) { return next(err); }
        var pageNum = Math.ceil(results.reviewPage/itemPerPage);
        var page = [];
        for(var i = 1;i<=pageNum;i++){
            page.push(i);
        }
        res.render('products/product-detail', {title: 'Chi tiết mặt hàng',item:  product, category: results.category, productRelates:results.productRelate, user:req.user, reviews: results.review, num: results.reviewPage,page:page,watch: product.watch} );
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
      }).catch((err) => {
        console.log(err);
      });
    });
    res.redirect('/product/detail/'+req.params.id);
}

exports.product_review = async function(req, res) {
    var review = new Review({
        name: req.body.name,
        content: req.body.review,
        product: req.params.id,
        star: req.body.rating,
    });
    await review.save();
    res.redirect('/product/detail/'+req.params.id);
};

