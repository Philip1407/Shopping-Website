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
exports.cart_list =  async function(req, res) {
    var total = 0;
    var products = [];
    if(!req.user) {

        if(!req.session.cart) {
            return  res.render("cart/shoppingcart", {title: 'Giỏ hàng', total: total, products: products, user:req.user, mess: 'Chưa có sản phẩm nào trong giỏ hàng.'});
        }

        await Promise.all(req.session.cart.map( async element => {
            var result = await Product.findOne({_id:element.product},{ _id:0, name:1, price:1, img:1 })
            result.img = result.img[0];
            total+= element.amount*result['price'];
            products.push({productID: element.product, productName: result['name'], productPrice: result['price'], amount: element.amount, img: result['img'], total: element.amount*result['price']});
        }));
    }
    else {
        if( req.user.cart==[]) {
            return res.render("cart/shoppingcart", {title: 'Giỏ hàng', total: total, products: products, user:req.user, mess: 'Chưa có sản phẩm nào trong giỏ hàng.'});
        }
        await Promise.all(req.user.cart.map( async element => {
            var result = await Product.findOne({_id:element.product},{ _id:0, name:1, price:1, img:1 }) 
            result.img = result.img[0];
            total+= element.amount*result['price'];
            products.push({productID: element.product, productName: result['name'], productPrice: result['price'], amount: element.amount, img: result['img'], total: element.amount*result['price']});
        }));
    }
    products.sort(function(a,b) {
        if(a.productName > b.productName){
            return 1;
        }
        return -1;
    });
    res.render("cart/shoppingcart", {title: 'Giỏ hàng', total: total, products: products, user:req.user});
};

exports.cart_update_product = async function(req, res) {
    var total = 0;
    var products = [];
    var totalPro = 0;
    if(!req.user) {

        if(!req.session.cart) {
            return res.redirect('/shoppingcart');
        }

        await Promise.all(req.session.cart.map( async element => {
            var temp = req.body[element.product];
            element.amount = parseInt(temp);
            if(element.amount !== 0) {
                var result  = await Product.findOne({_id:element.product},{ _id:0, name:1, price:1, img:1 })
                total+= element.amount*result.price;
                totalPro+= element.amount;
                products.push({productID: element.product, productName: result.name, productPrice: result.price, amount: element.amount, img: result['img'], total: element.amount*result['price']});
            }
            else{
                req.session.cart = req.session.cart.filter( pro => {return pro.amount !== 0;});
            }
        }));
    }
    else {
        if( req.user.cart==[]) {
            return res.redirect('/shoppingcart');
        }
        
        await req.user.cart.forEach( async element => {
            var temp = req.body[element.product];
            
            element.amount = parseInt(temp);
            if(element.amount !== 0) {
                var result = await Product.findOne({_id:element.product},{ _id:0, name:1, price:1, img:1 })
                total+= element.amount*result.price;
                totalPro+= element.amount;
                products.push({productID: element.product, productName: result.name, productPrice: result.price, amount: element.amount, img: result['img'], total: element.amount*result['price']});
            }
        });
        var user = await User.findById(req.user._id)
        user.cart = req.user.cart.filter( pro => {return pro.amount !== 0;});
        await user.save();
    }
    req.session.amountproduct = totalPro;
    products.sort(function(a,b) {
        if(a.productName > b.productName){
            return 1;
        }
        return -1;
    });
    res.redirect('/shoppingcart');
};

exports.order_list = async function(req, res) {
    var result = await Order.find({custom:req.user._id}).sort({day:-1})
    await Promise.all(result.map( async order=>{
        order.date = formatDate(order.day);
        order.total = 0;
        await Promise.all(order.products.map( async element => {
            var result = await Product.findOne({_id:element.product},{ _id:0, name:1, price:1, })
            order.total += element.amount*result.price;
            element.product = result.name;
            element.price =result.price;
        }))
    }));
    res.render('cart/history', { title: 'Lịch sử mua hàng', data:result, admin:req.user}); 
};

exports.order_detail = async function(req, res, next){
    var total=0;
    var order = await Order.findOne({_id:req.params.id});
    order.date = formatDate(order.day);

    await Promise.all(order.products.map( async element => {
        var result = await Product.findOne({_id:element.product},{ _id:0, name:1, price:1, img:1 })
        total+= element.amount*result.price;
        element.product = result.name;
        element.price =result.price;
        element.img = result.img;
        element.total = element.amount*result.price;
    }));   
    order.totalship = total + order.shipfee;
    res.render('cart/orderdetail', { title: 'Chi tiết đơn hàng', data:order, total:total, admin:req.user}); 
}

exports.order_create = function(req, res, next) {
    if(!req.user){
        res.redirect('/login');
    }
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
        req.session.cart = [];
        req.session.amountproduct = 0;
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

