var Cart = require("../models/orders");
var Product = require("../models/products")
var User = require("../models/users");

function formatDate(date){
    var dd = date.getDate();
    var mm=date.getMonth()+1;
    var yyyy=date.getFullYear();
    if(dd < 10)
      {
          dd = '0'+ dd;
      }
    if(mm < 10)
    {
        mm = '0' + mm;
    }
    return dd+"/"+mm+"/"+yyyy;
    
  }


// Display list of carts.
exports.cart_list =  function(req, res) {
    var total = 0;
    var products = [];
    var mess = '';
    setTimeout(function(){
        products.sort(function(a,b) {
            if(a.productName > b.productName){
                return 1;
            }
            return -1;
        });
        res.render("cart/shoppingcart", {title: 'Giỏ hàng', total: total, products: products, user:req.user});
    },10000);

    if(req.user === undefined) {

        if(req.session.cart === undefined) {
            return  res.render("cart/shoppingcart", {title: 'Giỏ hàng', total: total, products: products, user:req.user, mess: 'Chưa có sản phẩm nào trong giỏ hàng.'});
        }

        req.session.cart.forEach( element => {
            Product.findOne({_id:element.product},{ _id:0, name:1, price:1, img:1 }).exec().then((result) => {
               total+= element.amount*result['price'];
               products.push({productID: element.product, productName: result['name'], productPrice: result['price'], amount: element.amount, img: result['img'], total: element.amount*result['price']});
              }).catch((err) => {
                console.log(err);
            });
        });
    }
    else {
        if( req.user.cart==[]) {
            return res.render("cart/shoppingcart", {title: 'Giỏ hàng', total: total, products: products, user:req.user, mess: 'Chưa có sản phẩm nào trong giỏ hàng.'});
        }
        req.user.cart.forEach( element => {
        Product.findOne({_id:element.product},{ _id:0, name:1, price:1, img:1 }).exec().then((result) => {
           total+= element.amount*result['price'];
           products.push({productID: element.product, productName: result['name'], productPrice: result['price'], amount: element.amount, img: result['img'], total: element.amount*result['price']});
          }).catch((err) => {
            console.log(err);
            });
        });
    }
};

exports.cart_update_product = function(req, res) {
    var total = 0;
    var products = [];

    setTimeout(function(){
        products.sort(function(a,b) {
            if(a.productName > b.productName){
                return 1;
            }
            return -1;
        });
        if(product==[]) {
            return  res.render("cart/shoppingcart", {title: 'Giỏ hàng', total: total, user:req.user, mess: 'Chưa có sản phẩm nào trong giỏ hàng.'});
        }
        res.render("cart/shoppingcart", {title: 'Giỏ hàng', total: total, products: products, user:req.user});
    },10000);

    if(req.user === undefined) {

        if(req.session.cart === undefined) {
            return  res.render("cart/shoppingcart", {title: 'Giỏ hàng', total: total, user:req.user, mess: 'Chưa có sản phẩm nào trong giỏ hàng.'});
        }

        req.session.cart.forEach( element => {
            var temp = req.body[element.product];
            element.amount = parseInt(temp);
            if(element.amount !== 0) {
                Product.findOne({_id:element.product},{ _id:0, name:1, price:1, img:1 }).exec().then((result) => {
                total+= element.amount*result['price'];
                products.push({productID: element.product, productName: result['name'], productPrice: result['price'], amount: element.amount, img: result['img'], total: element.amount*result['price']});
                }).catch((err) => {
                    console.log(err);
                });
            }
        });
    }
    else {
        if( req.user.cart==[]) {
            return res.render("cart/shoppingcart", {title: 'Giỏ hàng', total: total, products: products, user:req.user, mess: 'Chưa có sản phẩm nào trong giỏ hàng.'});
        }
        
        req.user.cart.forEach( element => {
            var temp = req.body[element.product];
            element.amount = parseInt(temp);
            if(element.amount !== 0) {
                Product.findOne({_id:element.product},{ _id:0, name:1, price:1, img:1 }).exec().then((result) => {
                total+= element.amount*result['price'];
                products.push({productID: element.product, productName: result['name'], productPrice: result['price'], amount: element.amount, img: result['img'], total: element.amount*result['price']});
                }).catch((err) => {
                    console.log(err);
                    });
            }

        });

        User.findById(req.user._id).exec(function(err, user) {
            user.cart = req.user.cart.filter(function( pro ) {
                return pro.amount !== 0;
              });
            user.save();
        });
    }
};

// Handle cart update on POST.
exports.cart_update_post = function(req, res) {
    cart = new Cart({
        custom : req.user,
        day:Date.now,
        status:"Đã nhận",
        address: req.address + ' ' + req.district + ' ' + req.country,
        phone:req.phone_number,
        product: req.product
    });
    
    cart.save(function(err){
        if(err){
            return next;
        }
        res.send("Đơn hàng đã được xác nhận");
        res.redirect('/');
    })
};

// // Display detail page for a specific cart.
// exports.cart_detail = function(req, res) {
//     res.send('NOT IMPLEMENTED: cart detail: ' + req.params.id);
// };

// // Display cart create form on GET.
// exports.cart_create_get = function(req, res) {
//     res.send('NOT IMPLEMENTED: cart create GET');
// };

// // Handle cart create on POST.
// exports.cart_create_post = function(req, res) {
//     res.send('NOT IMPLEMENTED: cart create POST');
// };

// // Display cart delete form on GET.
// exports.cart_delete_get = function(req, res) {
//     res.send('NOT IMPLEMENTED: cart delete GET');
// };

// // Handle cart delete on POST.
// exports.cart_delete_post = function(req, res) {
//     res.send('NOT IMPLEMENTED: cart delete POST');
// };

