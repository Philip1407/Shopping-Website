function getMonth(data) {
  console.log(data);
  var months = [];
  data.forEach((item, index) => {
      months[index]=item._id;
      switch (months[index]) {
        case 1:
            months[index]="Tháng 1";
            break; 
        case 2:
            months[index]="Tháng 2";
            break;            
        case 3:
            months[index]="Tháng 3";
            break;
        case 4:
          months[index]="Tháng 4";
            break; 
        case 5:
            months[index]="Tháng 5";
            break;            
        case 6:
            months[index]="Tháng 6";
            break;
        case 7:
            months[index]="Tháng 7";
            break; 
        case 8:
            months[index]="Tháng 8";
            break;            
        case 9:
            months[index]="Tháng 9";
            break;
        case 10:
            mnth="Tháng 10";
            break; 
        case 11:
            months[index]="Tháng 11";
            break;            
        case 12:
            months[index]="Tháng 12";
            break;
    }
  });
  return months;
}

function getValue(data) {
  var value = [];
  data.forEach((item, index) => {
      value[index]=item.total;
  });
  
  return value;
}

var Product = require('../models/products');
var Order = require('../models/orders');

exports.statistics_month_list = function(req, res){
  var current = new Date();
  var year = parseInt(current.getFullYear());
  var temp = null;
  Order.aggregate(
    [
      {
        $match: {
        day: {$gte: new Date(year+'-01-01')}
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
 ).exec().then((list) => {
  temp = list;
  setTimeout(function(){
    var result = [];
    result[0] = getMonth(temp);
    result[1] = getValue(temp);
    console.log(result[0]);
    res.render('statistics_month/statistics_month', { title: 'Thống kê', data: result});
  },10000);
    temp.forEach( async element => {
      await element.product_list.forEach(async (item, index1) => {
        element['total'] = 0;
        await item.forEach((pro, index2) => {
          return Product.findOne({_id:pro},{ _id:0, price:1}).exec().then((result) => {
            //console.log(item);
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

// Display statistics_month update form on GET.
exports.statistics_month_update_get = function(req, res) {
res.send('NOT IMPLEMENTED: statistics_month update GET');
};

// Handle statistics_month update on POST.
exports.statistics_month_update_post = function(req, res) {
res.send('NOT IMPLEMENTED: statistics_month update POST');
};