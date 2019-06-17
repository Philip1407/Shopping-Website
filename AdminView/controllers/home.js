var Product = require('../models/products');
var Order = require('../models/orders');
var async = require('async');


function getValueMonth(data) {
    var value = [0,0,0,0,0,0,0,0,0,0,0,0];
    data.forEach((item) => {
      value[item._id-1]=item.total/1000000;
    });
    return value;
  }

exports.index = async function(req, res){
    const current = new Date();
    
    const day = current.getDate();
    const month = current.getMonth() +1;
    const year = parseInt(current.getFullYear());
    
    const newOrder = await Order.countDocuments({day: {$gt: new Date(year+'-'+ month +'-'+ day)}, status:"Đang giao"});
    const newBill = await Order.countDocuments({day: {$gt: new Date(year+'-'+ month +'-'+ day)}, status:"Đã nhận"});

    Order.aggregate(
        [
        {
            $match: {
                status: 'Đã nhận',
                day: {$gte: new Date(year+'-01-01'), $lte: new Date(year+'-12-31')}
            }
        },
        {
            $group: {
            _id: {$month: '$day'},
            product_list: { $push: "$products.product" },
            amount_list: {$push: "$products.amount"}
            }
        }
        ]
    ).sort({_id:1}).exec().then((list) => {
    if(list==0) {
        res.render('index', { title: 'Trang chủ', admin:req.user,  newOrder: newOrder, newBill:newBil});
    }

    setTimeout(function(){
        res.render('index', { title: 'Trang chủ', admin:req.user,  newOrder: newOrder, newBill:newBill, dataD: getValueMonth(list)});
    },10000);
        
        list.forEach( element => {
        return element.product_list.forEach((item, index1) => {
            element['total'] = 0;
            return item.forEach((pro, index2) => {
            return Product.findOne({_id:pro},{ _id:0, price:1}).exec().then((result) => {
                element['total']+= element.amount_list[index1][index2]*result['price'];
            // console.log(element['total']);
            }).catch((err) => {
                console.log(err);
                });
            });
        });
        });
    });  
};