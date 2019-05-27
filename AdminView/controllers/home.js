exports.index = function(req, res){
   // console.log(req.admin);
    res.render('index', { title: 'Trang chủ', admin:req.user});
};