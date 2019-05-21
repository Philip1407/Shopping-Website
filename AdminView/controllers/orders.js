var Product = require('../models/products');
var Order = require('../models/orders');
var User = require('../models/users');

exports.orders_list = function(req, res){
  Order.find().exec(function(err, result) {
    
    setTimeout(function(){
      console.log(result);
      res.render('orders/orders', { title: 'Quản lý đơn hàng', data:result}); 
    },10000);

    result.forEach((order)=>{
      console.log(order.custom);
      User.findOne({_id: order.custom},{_id:0, username:1}).exec().then((name)=>{
        order['custom']=name['username'];
        console.log(name['name']);
      }).catch((err) => {
        console.log(err);
      });

        order['total']=0;
        order.products.forEach( element => {
          return Product.findOne({_id:element.product},{ _id:0, name:1, price:1, }).exec().then((result) => {
            order['total']+= element.amount*result['price'];
            element.product = result['name'];
            element['price']=result['price'];
          // console.log(element['total']);
          }).catch((err) => {
            console.log(err);
        });
      });
    });
  });
};

// Display orders delete form on GET.
exports.orders_delete_get = function(req, res) {
  res.send('NOT IMPLEMENTED: orders delete GET');
};

// Handle orders delete on POST.
exports.orders_delete_post = function(req, res) {
  res.send('NOT IMPLEMENTED: orders delete POST');
};

exports.orders_getdetail = function(req,res, next) {
  total=0;
  Order.findOne({_id:req.params.id}, function(err, order) {
    setTimeout(function(){
      console.log(order);
      console.log(total);
      res.render('orders/orders_detail', { title: 'Chi tiết đơn hàng', data:order, total:total}); 
    },10000);
    User.findOne({_id: order.custom},{_id:0, username:1}).exec().then((name)=>{
      order['custom']=name['username'];
      console.log(name['username']);
    }).catch((err) => {
      console.log(err);
    });

    if(err){ return next(err); }
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
  });   
};