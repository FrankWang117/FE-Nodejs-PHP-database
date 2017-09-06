//载入 express 模块
var express = require('express');
var app = express();
var swig = require('swig');
var request = require('request');
var path = require('path');

//配置模板引擎为 html，作用是告诉node模板引擎文件位置
app.set('views', './views/');
app.set('view engine', 'html');
app.engine('html', swig.renderFile);

// 设置静态文件路径
app.use(express.static(path.join(__dirname, 'public')));
// 设置添加数据界面的路由
app.get('/adding', function(req, res) {
	res.render('add_data')
});

// 设置路由，用来接受add_data.html传来的数据
app.get('/addData', function(req, res) {
	var responseData =
		"mathNum=" + req.query.mathNum + '&' +
		"mathAdd=" + req.query.mathAdd + '&' +
		"engNum=" + req.query.engNum + '&' +
		"engAdd=" + req.query.engAdd + '&' +
		"ccNum=" + req.query.ccNum + '&' +
		"ccAdd=" + req.query.ccAdd + '&' +
		"freeNum=" + req.query.freeNum + '&' +
		"freeAdd=" + req.query.freeAdd;
	request('http://localhost/database/get.php?' + responseData, function(error, response, body) {
		res.json(body);
	});
});

//设置路由，用来将数据展示到页面中去
app.get('/showing', function(req, res) {
	res.render('show_data')
});

//设置路由，作用是接收来自‘show_data.html’的ajax请求，并将数据库中的数据通过PHP发送至此
app.get('/showData', function(req, res) {
	var responseData =
		"mathNum=" + req.query.mathNum + '&' +
		"mathAdd=" + req.query.mathAdd + '&' +
		"engNum=" + req.query.engNum + '&' +
		"engAdd=" + req.query.engAdd + '&' +
		"ccNum=" + req.query.ccNum + '&' +
		"ccAdd=" + req.query.ccAdd + '&' +
		"freeNum=" + req.query.freeNum + '&' +
		"freeAdd=" + req.query.freeAdd;
	request('http://localhost/database/back.php?' + responseData, function(error, response, body) {
		res.json(body);
	});
});

// 创建路由，用于跳转至各个课程详情数据
app.get('/aClassData', function(req, res) {
	res.render('aclass')
});
app.get('/bClassData', function(req, res) {
	res.render('bclass')
});
app.get('/cClassData', function(req, res) {
	res.render('cclass')
});
app.get('/dClassData', function(req, res) {
	res.render('dclass')
});

//以及登录与注册界面路由
app.get('/signin', function(req, res) {
	res.render('signin')
});
app.get('/signup', function(req, res) {
	res.render('signup')
});

//设置端口
var server = app.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});
