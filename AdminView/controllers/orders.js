var Product = require('../models/products');
var Order = require('../models/orders');
var User = require('../models/users');

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

exports.orders_list = async function(req, res){
  var result = await Order.find();

    await Promise.all(result.map(async (order)=>{
      order.date = formatDate(order.day);
      var name = await User.findOne({_id: order.custom},{_id:0, username:1})
      order.customName=name.username;
    }));
      order.total = 0;
      await Promise.all(order.products.map( async element => {
          var result = await Product.findOne({_id:element.product},{ _id:0, name:1, price:1, })
          order.total+= element.amount*result.price;
          element.product = result.name;
          element.price=result.price;
      }))
      res.render('orders/orders', { title: 'Quản lý đơn hàng', data:result, admin:req.user}); 
    }


exports.orders_delete_get = function(req, res) {
  res.send('NOT IMPLEMENTED: orders delete GET');
};


exports.orders_delete_post = function(req, res) {
  res.send('NOT IMPLEMENTED: orders delete POST');
};

exports.orders_getdetail = async function(req,res, next) {
  total=0;
  var order =  await Order.findOne({_id:req.params.id});
  order['date'] = formatDate(order.day);
  var name = await User.findOne({_id: order.custom},{_id:0, username:1})
  order.customName=name.username;
  await Promise.all(order.products.map( async element => {
    var result = await Product.findOne({_id:element.product},{ _id:0, name:1, price:1, })
    total+= element.amount*result.price;
    element.product = result.name;
    element.price=result.price;
  }));
  res.render('orders/orders_detail', { title: 'Chi tiết đơn hàng', data:order, total:total, admin:req.user});
}