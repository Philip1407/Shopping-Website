//var statistics_year = require('..\views\statistics_year');
var Product = require('../models/products');
var Order = require('../models/orders');

exports.statistics_year_list = function(req, res){
  var current = new Date();
  var year = parseInt(current.getFullYear());
  
  Order.find(
    {day:{$gt: new Date(year+'-01-01')}}, 
    {_id:0, day: 1, products:1}
  ).exec().then((list) => {
    console.log(list);
    console.log(list[0].product[0]);
    res.render('statistics_year/statistics_year', { title: 'Thống kê'});
  });
/*
    temp = list_products;
    temp.forEach( element => {
      return Product.findOne({_id:element._id},{ _id:0, name: 1, catergory:1}).exec().then((result) => {
        element['name'] = result['name'];
        element['category']=result['catergory'];
        Category.findOne({_id:element.category},{ _id:0, name: 1}).exec().then((result) => {
          element['categoryName']=result['name'];
        //console.log("123456");
      }).catch((err) => {
        console.log(err);
      });
    });
  });
 
});

  res.render('statistics_year/statistics_year', { title: 'Thống kê'}); */
};

// Display statistics_year update form on GET.
exports.statistics_year_update_get = function(req, res) {

res.send('NOT IMPLEMENTED: statistics_year update GET');
};

// Handle statistics_year update on POST.
exports.statistics_year_update_post = function(req, res) {
res.send('NOT IMPLEMENTED: statistics_year update POST');
};