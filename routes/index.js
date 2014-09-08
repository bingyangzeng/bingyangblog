/* GET home page. */
var crypto = require('crypto'),
    User   = require('../models/user.js');

exports.index = function(req, res){
  res.render('index', { title: '首页' });
};
exports.user = function(req, res){
};
exports.post = function(req, res){
};
exports.reg = function(req, res){
    var error1  = req.session.error1?req.session.error1:null;
    var success = req.flash('success')?req.flash('success').toString():null;
    console.log('start1')
    console.log(error1);
    console.log(req.session)
    res.render('reg',{title:'用户注册',error:error1,success:success});
};
exports.doReg = function(req, res){
  var name = req.body.username,
      password = req.body.password,
      password_re = req.body['passwordrepeat'];
  if( passwordrepeat != password_re ){
	req.flash('error','二次输入的口令不一致');
	return res.redirect('/reg');
  }
  var md5 = crypto.createHash('md5'),
      password = md5.update(req.body.password).digest('hex');
  var newUser = new User({
	name:name,
	password:password
	//email:req.body.email
  });
  User.get(newUser.name,function(err , user){
	if(user){
		req.flash('error','用户已经存在!');
		return res.redirect('/reg');
	}
	newUser.save(function(err,user){
		if(err){
			req.flash('error',err);
			return res.redirect('/reg');
		}
		req.session.user = user;
		req.flash('success','注册成功!');
		res.redirect('/');
	});
  });
});

exports.login = function(req, res){
};
exports.doLogin = function(req, res){
};
exports.logout = function(req, res){
};

exports.hello= function(req, res){
  res.send('The time is'+new Date().toString());
};
