var Product = require('../models/products');
var Category = require('../models/catergories');
var User = require('../models/users');
var Review = require('../models/reviews');


var async = require('async');
exports.index = function(req, res) {
    if(!req.session.cart){
         req.session.amountproduct = 0;
    }
    res.locals.amountproduct = req.session.amountproduct;
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
        var linkPage = '/page';  
        res.render('products/home', { title: 'Trang chủ',linkPage:linkPage,page:page,products:results.products,categories:results.categories, user:req.user});
    });
};

exports.home_search_post= function(req, res) {
    if(req.body.search=="") {
        res.redirect('/');
    }
    res.redirect('/search/'+req.body.search+'/1');
};
exports.home_search_get= function(req, res) {
    var itemPerPage = 12;
    page = req.params.page?req.params.page:1;
    async.parallel({
        products: function(callback){
            Product.find({"name": {$regex: new RegExp(".*"+req.params.search+".*", "i")}})
            .skip((itemPerPage * page) - itemPerPage)
            .limit(itemPerPage)
            .exec(callback);
        },
        categories: function(callback){
            Category.find().exec(callback);
            },
        pageCount: function(callback){
            Product.countDocuments({"name": {$regex: new RegExp(".*"+req.params.search+".*", "i")}}).exec(callback)
        }
    },function(err, results) {
        if (err) { return next(err); }
        var pageNum = Math.ceil(results. pageCount/itemPerPage);
        var page = [];
        for(var i = 1;i<=pageNum;i++){
            page.push(i);
        }
        var notfound = null;
        var found= null;
        if(results.products == 0){
            notfound = 'Không tìm thấy sản phẩm phù hợp với từ khóa \"' + req.params.search + '\".';
        }
        else {
            found= 'Các sản phẩm phù hợp với từ khóa \"' + req.params.search + '\".';
        }
        var linkPage = '/search/'+req.params.search;
        res.render('products/home', { title: 'Sản Phẩm',linkPage:linkPage,page:page,products:results.products,categories:results.categories,none:notfound,done:found, textSearch:req.body.search, user:req.user });
    });
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
        var linkPage = '/product';
        res.render('products/product', { title: 'Sản phẩm',linkPage:linkPage,page:page,products:results.products,categories:results.categories, user:req.user});
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
exports.product_search_post = function(req, res) {
    if(req.body.search=="") {
        res.redirect('/product');
    }
    
    res.redirect('/product/search/'+req.body.search+'/1');
};

exports.product_search_get = function(req, res) {
    var itemPerPage = 12;
    page = req.params.page?req.params.page:1;
    async.parallel({
        products: function(callback){
            Product.find({"name": {$regex: new RegExp(".*"+req.params.search+".*", "i")}})
            .skip((itemPerPage * page) - itemPerPage)
            .limit(itemPerPage)
            .exec(callback);
        },
        categories: function(callback){
            Category.find().exec(callback);
            },
        pageCount: function(callback){
            Product.countDocuments({"name": {$regex: new RegExp(".*"+req.params.search+".*", "i")}}).exec(callback)
        }
    },function(err, results) {
        if (err) { return next(err); }
        var pageNum = Math.ceil(results. pageCount/itemPerPage);
        var page = [];
        for(var i = 1;i<=pageNum;i++){
            page.push(i);
        }
        var notfound = null;
        var found= null;
        if(results.products == 0){
            notfound = 'Không tìm thấy sản phẩm phù hợp với từ khóa \"' + req.params.search + '\".';
        }
        else {
            found= 'Các sản phẩm phù hợp với từ khóa \"' + req.params.search + '\".';
        }
        var linkPage = '/product/search/'+req.params.search;
        res.render('products/product', { title: 'Sản Phẩm',linkPage:linkPage,page:page,products:results.products,categories:results.categories,none:notfound,done:found, textSearch:req.body.search, user:req.user, });
    });
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
    if (req.user === undefined) {
        if(req.session.cart === undefined) {
            req.session.cart = [];
        }
        var i = req.session.cart.findIndex( item => item.product == req.params.id);
        if (i>-1) {
            req.session.cart[i].amount = parseInt(req.session.cart[i].amount)+ parseInt(req.body.num);
        }
        else {
            req.session.cart.push({product: req.params.id, amount: req.body.num });
        }
        console.log(req.session.cart);
    }
    else {
        if (req.user.cart==null) {
            User.findByIdAndUpdate(req.user._id,{cart:[]});
        }
        var i = req.user.cart.findIndex( item => item.product == req.params.id);
        var num = parseInt(req.body.num);
        console.log("i: " + i);
        if(i>-1) {
            num += parseInt(req.user.cart[i].amount);
            User.findByIdAndUpdate(req.user._id, 
                {$pull: {cart: {product: req.params.id}}}, 
                {multi: true}, 
                function(err, doc) {
                    if(err){
                    console.log(err);
                    }else{
                        console.log(doc);
                    }
                }
            );
        }
        User.findByIdAndUpdate(req.user._id, 
            {$push: {cart: [{product: req.params.id, amount: num}]}},
            {safe: true, upsert: true},
            function(err, doc) {
                if(err){
                console.log(err);
                }
            }
        );
    }
    req.session.amountproduct+=num;
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

