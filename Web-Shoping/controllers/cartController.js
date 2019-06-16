var Order = require("../models/orders");
var Product = require("../models/products")
var User = require("../models/users");

function formatCost(cost) {
    var result = "";
    var temp = cost.slice(0,cost.length-4);
    temp.split(".");
    for(i=0;i<temp.length;i++) {
        result+=temp[i];
    }
    return parseInt(result);
}
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
                result.img = result.img[0];
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
            
            result.img = result.img[0];
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
    var totalShip = 0;
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

exports.order_list = function(req, res) {
    Order.find({custom:req.user._id}).sort({day:-1}).exec(function(err, result) {
    
        setTimeout(function(){
          res.render('cart/history', { title: 'Lịch sử mua hàng', data:result, admin:req.user}); 
        },10000);
    
        result.forEach((order)=>{
          order['date'] = formatDate(order.day);
          order['total']=0;
            order.products.forEach( element => {
              return Product.findOne({_id:element.product},{ _id:0, name:1, price:1, }).exec().then((result) => {
                order['total']+= element.amount*result['price'];
                element.product = result['name'];
                element['price']=result['price'];
              }).catch((err) => {
                console.log(err);
            });
          });
        });
      });
};

exports.order_detail = function(req, res, next){
    total=0;
    Order.findOne({_id:req.params.id}, function(err, order) {
        if(err){ return next(err); }

        setTimeout(function(){
            order['totalship'] = total + order.shipfee;
            console.log(order);
        res.render('cart/orderdetail', { title: 'Chi tiết đơn hàng', data:order, total:total, admin:req.user}); 
        },10000);
        order['date'] = formatDate(order.day);

        order.products.forEach( element => {
        return Product.findOne({_id:element.product},{ _id:0, name:1, price:1, img:1 }).exec().then((result) => {
            total+= element.amount*result['price'];
            element.product = result['name'];
            element['price']=result['price'];
            element['img'] = result['img'];
            element['total'] = element.amount*result['price'];
            console.log(element['total']);
        }).catch((err) => {
            console.log(err);
            });
        });
    });  
}

exports.order_create = function(req, res, next) {
    var order = new Order({
        custom: req.user._id,
        day: new Date(),
        status: "Đang giao",
        address: req.body.address + ", " + req.body.district + ", TP.HCM",
        products: req.user.cart,
        phone: req.body.phone,
        recipientname: req.body.recipientname,
        shipfee: formatCost(req.body.shipfee)
    });
    order.save(function (err) {
        if (err) { return console.log(err); }
        res.redirect('/history');
      });
}
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

