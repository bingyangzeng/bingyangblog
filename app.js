var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
/***增加Mongodb的支持****/
var MongoStore = require("connect-mongo")(express);
var settings   = require("./settings");
var flash      = require("connect-flash");

var users = require('./routes/user');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(flash());
app.use(favicon());
app.use(logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(express.session({
	secret:settings.cookieSecret,
	key : settings.db,
	cookie :{maxAge:1000*60*60*24*30},
	store : new MongoStore({
		db:settings.db
	})
}));


app.get('/', routes.index);
app.get('/u/:user',routes.user);
app.get('/post',routes.post);
app.get('/reg', routes.reg);
app.post('/reg', routes.doReg);
app.get('/login', routes.login);
app.post('/login', routes.doLogin);
app.get('/logout', routes.logout);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}



// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});
/*app.dynamicHelpers({
	user:function(req,res){

	},
	error:function(req,res){

	},
	success:function(req,res){

	}
});*/
app.use(function(req,res,next){
//    res.locals.user = req.session?req.session.user:'';
    console.log('---star-----\n');
    console.log(req);
    console.log('---center-----\n');
    console.log(res);
    console.log('---end-----\n');
    res.locals.error= req.flash('error');
    res.locals.success = req.flash('success');
});


module.exports = app;
