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

	});
});

//设置端口
var server = app.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});
