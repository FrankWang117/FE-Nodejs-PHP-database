//载入 express 模块npm install express --save
var express = require('express');
// 处理文件路径的path模块。
var path = require('path');
var app = express();
// 使http请求变的超简单 npm install request --save
var request = require('request');
//express 中的swig模板
var swig = require('swig');

//将swig的模板数据引用格式由{{}}改为[[]]
// swig.setDefaults({
// 	varControls: ['[[', ']]']
// });

//配置模板引擎 html 告诉node 模板引擎文件位置
//设置html文件打开路径
app.set('views', './views/');
app.set('view engine', 'html');
//swig模板中用于将文件发送到页面中去
// app.engine('html', swig.renderFile);

// 设置静态文件的绝对路径
app.use(express.static(path.join(__dirname, 'public')));

//设置ajax发送数据的路由，并通过php插入数据库
app.get('/index/add', function(req, res) {
	// responseData为字符串，用于get传输
	var responseData =
		"allfeNum=" + req.query.allfeNum + '&' +
		"allfeAdd=" + req.query.allfeAdd + '&' +
		"readyNum=" + req.query.readyNum + '&' +
		"readyAdd=" + req.query.readyAdd + '&' +
		"zeroNum=" + req.query.zeroNum + '&' +
		"zeroAdd=" + req.query.zeroAdd + '&' +
		"freeNum=" + req.query.freeNum + '&' +
		"freeAdd=" + req.query.freeAdd;

	request('http://localhost/ydclass/get.php?' + responseData, function(error, response, body) {
		// res.send(responseData);
		res.json(body);
	});
});

//设置添加数据页面的路由，也就是views文件夹下的add_data.html
app.get('/views', function(req, res) {
	res.render('add_data');
});

//设置展示界面-数据表，同上，为views文件夹下的index.html
app.get('/views/index', function(req, res) {
	res.render('index');
});

//设置接收ajax请求数据的路由，并把数据库里的数据通过php发送到本路由
app.get('/index/added', function(req, res) {
	var responseData =
		"allfeNum=" + req.query.allfeNum + '&' +
		"allfeAdd=" + req.query.allfeAdd + '&' +
		"readyNum=" + req.query.readyNum + '&' +
		"readyAdd=" + req.query.readyAdd + '&' +
		"zeroNum=" + req.query.zeroNum + '&' +
		"zeroAdd=" + req.query.zeroAdd + '&' +
		"freeNum=" + req.query.freeNum + '&' +
		"freeAdd=" + req.query.freeAdd;

	request('http://localhost/ydclass/city.php?' + responseData, function(error, response, body) {
		// res.send(responseData);
		res.json(body);
	});
});

//设置端口，推荐使用supervisor进行热更新。
var server = app.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});


// 以下是使用cheerio获取其他页面动态数据 的方法
// var http = require('http');
// Cheerio 是一个Node.js的库， 它可以从html的片断中构建DOM结构，然后提供像jquery一样的css选择器查询
// var cheerio = require('cheerio');
// var request = require('request');
// var rp = require('request-promise');
