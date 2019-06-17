function getValueMonth(data) {
  var value = [0,0,0,0,0,0,0,0,0,0,0,0];
  data.forEach((item) => {
    value[item._id-1]=item.total/1000000;
  });
  return value;
}

function getValueDay(data) {
  var value = [0,0,0,0,0,0,0];
  var i=0;
  data.forEach((item) => {
    value[i]=item.total/1000000;
    i++;
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
    res.render('statistics/statistics_month', { title: 'Thống kê', admin:req.user, dataD: getValueMonth(list), textYear: year, hidden: "hidden"});
  }

  setTimeout(function(){
    console.log(getValueMonth(list));
    res.render('statistics/statistics_month', { title: 'Thống kê', admin:req.user, dataD: getValueMonth(list), textYear: year});
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
    return res.render('statistics/statistics_month', { title: 'Thống kê',admin:req.user, textYear: "", hidden: "hidden", message:"Năm nhập vào không hợp lệ, vui lòng nhập lại!"});
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
    return res.render('statistics/statistics_month', { title: 'Thống kê',admin:req.user, dataD: getValueMonth(list), textYear: year, hidden: "hidden", message:"Không có dữ liệu để thống kê cho năm " + year});
  }
  setTimeout(function(){
    console.log(getValueMonth(list));
    res.render('statistics/statistics_month', { title: 'Thống kê',admin:req.user, dataD: getValueMonth(list), textYear: year});
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

exports.statistics_day_list = function(req, res){
  return res.render('statistics/statistics_day', { title: 'Thống kê'});
};

// Display statistics_day update form on POST.
exports.statistics_day_update = function(req, res) {
  return res.render('statistics/statistics_day', { title: 'Thống kê'});
};

exports.statistics_week_list = function(req, res){
  return res.render('statistics/statistics_week', { title: 'Thống kê'});
};
// Display statistics_week update form on POST.
exports.statistics_week_update = function(req, res){
  return res.render('statistics/statistics_week', { title: 'Thống kê'});
};

exports.statistics_quarter_list = function(req, res){
  return res.render('statistics/statistics_quarter', { title: 'Thống kê'});
};
// Display statistics_quarter update form on POST.
exports.statistics_quarter_update = function(req, res){
  return res.render('statistics/statistics_quarter', { title: 'Thống kê'});
};

exports.statistics_year_list = function(req, res){
  return res.render('statistics/statistics_year', { title: 'Thống kê'});
};
// Display statistics_year update form on POST.
exports.statistics_year_update = function(req, res){
  return res.render('statistics/statistics_year', { title: 'Thống kê'});
};
