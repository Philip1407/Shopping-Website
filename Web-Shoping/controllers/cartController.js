//var cart = require('../models/cart');
var Cart = require("../models/orders");
var Product = require("../models/products")

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


// Display list of all carts.
exports.cart_list =  function(req, res) {
    Cart.find({'custom':req.user._id}).exec(function(err,result){
        setTimeout(function(){
            res.render('cart/history', { title: 'Danh sách đơn hàng', history:result, user:req.user});
        },10000);

        result.forEach((cart)=>{
            cart['total']=0;
            cart['date'] = formatDate(cart.day);
            cart.products.forEach((prod=>{
               Product.findOne({_id: prod.product},{_id:0, name:1,price:1}).exec().then((query)=>{
                prod['prodname']=query['name'];
                cart['total']+= prod.amount*query['price'];
              }).catch((err) => {
                console.log(err);
              }); 
            }))
        })
    })
};

// Display cart update form on GET.
exports.cart_update_get = function(req, res) {
    res.render('cart/shoppingcart', { title: 'Giỏ hàng'});
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

