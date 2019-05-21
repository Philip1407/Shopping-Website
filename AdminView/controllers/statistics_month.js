function getValue(data) {
  var value = [0,0,0,0,0,0,0,0,0,0,0,0];
  data.forEach((item) => {
      months=item._id;
      switch (months) {
        case 1:
            value[0]=item.total/1000000;
            break; 
        case 2:
            value[1]=item.total/1000000;
            break;            
        case 3:
            value[2]=item.total/1000000;
            break;
        case 4:
          value[3]=item.total/1000000;
            break; 
        case 5:
            value[4]=item.total/1000000;
            break;            
        case 6:
            value[5]=item.total/1000000;
            break;
        case 7:
            value[6]=item.total/1000000;
            break; 
        case 8:
            value[7]=item.total/1000000;
            break;            
        case 9:
            value[8]=item.total/1000000;
            break;
        case 10:
            value[9]=item.total/1000000;
            break; 
        case 11:
            value[10]=item.total/1000000;
            break;            
        case 12:
            value[11]=item.total/1000000;
            break;
    }
  });
  return value;
}

var Product = require('../models/products');
var Order = require('../models/orders');

exports.statistics_month_list = function(req, res){
  var current = new Date();
  var year = parseInt(current.getFullYear());
  
  Order.aggregate(
    [
      {
        $match: {
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
 ).exec().then((list) => {
  if(list==0) {
    res.render('statistics_month/statistics_month', { title: 'Thống kê', dataD: getValue(list), textYear: year, hidden: "hidden"});
  }

  setTimeout(function(){
    console.log(getValue(list));
    res.render('statistics_month/statistics_month', { title: 'Thống kê', dataD: getValue(list), textYear: year});
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

// Display statistics_month update form on POST.
exports.statistics_month_update = function(req, res) {
  var pattern = /^\d+$/;
  if (!pattern.test(req.body.year)) 
  {
    return res.render('statistics_month/statistics_month', { title: 'Thống kê', textYear: "", hidden: "hidden", message:"Năm nhập vào không hợp lệ, vui lòng nhập lại!"});
  }
  var year = parseInt(req.body.year);
  console.log(year);
  Order.aggregate(
    [
      {
        $match: {
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
 ).exec().then((list) => {
  if(list==0) {
    return res.render('statistics_month/statistics_month', { title: 'Thống kê', dataD: getValue(list), textYear: year, hidden: "hidden", message:"Không có dữ liệu để thống kê cho năm " + year});
  }
  setTimeout(function(){
    console.log(getValue(list));
    res.render('statistics_month/statistics_month', { title: 'Thống kê', dataD: getValue(list), textYear: year});
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
