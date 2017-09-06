# FE-Nodejs-PHP-database
本demo主要实现的功能是使用前端表格输入相关数据，将数据通过Ajax请求发送至nodejs中，在经由php发送至数据库中，然后在从数据库中通过php将数据取出，经由nodejs发送至页面中。nodejs起中间件的作用。  
主要使用的技术有：  

 - 前端页面：html5、CSS3、JavaScript；  
 - nodejs：express框架、swig模板；  
 - php：封装类，查询、插入数据。
### 开始准备工作  
#### 创建项目文件夹-FEtoBE：
在命令行使用`npm init `初始化项目文件夹，填写项目名称等一系列，或者一路`enter`，结束后项目文件会出现一个新文件`package.json`，就是刚才填写的或默认的数据。
## 前端-数据库
### 创建写入数据页面  
在FEtoBE 文件夹下创建 `views` 和 `public` 文件夹，在`views`文件夹下创建`add_data.html`文件，作为写入数据的窗口，此处，创建了一个表格，模拟补习班四个课程每天新增报名人数，以及总的报名人数。总体效果如下图所示（未做兼容性及美化）： ![add_data.html](http://img.blog.csdn.net/20170905211201868?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcGVuZ185/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
表格文件在[Github上。](https://github.com/FrankWang1991/FE-Nodejs-PHP-database/blob/master/FEfiles/views/ashidd_data.html)  
### 数据传输经过nodejs
#### 安装相应插件模板等
此步的总体流程为：给表格中的按钮“点击添加”添加事件，使其通过点击事件，发送Ajax请求，将表格中的数据通过get方法传输到Node某路由中。  
所以此处需要创建node文件，并使用`express` 模板来创建相应路由（保证电脑中已安装node）。  

- 在命令行中，安装`express`: npm install express --save;  
- 安装`swig`模板：npm install express --save;   
- 在`FEtoBE`文件夹下创建 `app.js` 文件，并引入`express`以及`swig`、`path`；
 
此时文件结构：![这里写图片描述](http://img.blog.csdn.net/20170905212816587?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcGVuZ185/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)    
#### 配置相应路由等
继续在`app.js`中书写，配置模板引擎，node模板引擎文件位置：

```
//配置模板引擎为 html，作用是告诉node模板引擎文件位置  
app.set('views','./views/');
app.set('view engine','html');
app.engine('html', swig.renderFile);
// 设置静态文件路径
app.use(express.static(path.join(__dirname, 'public')));
```
继而设置路由，用来接受`add_data.html`传来的数据，以及端口：

```
// 设置添加数据界面的路由
app.get('/adding', function(req, res) {
	res.render('add_data')
});

//设置路由，接收数据
app.get('/addData', function(req, res) {
	console.log(req.query.mathNum);//验证是否成功传输数据
})
//设置端口
var server = app.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log('Example app listening at http://%s:%s', host, port);
});
```
#### 设置ajax发送表格数据  
此时，需要的`add_data.html`文件中，使用ajax来发送数据：

```
<script type="text/javascript">
        $('#submit-button').on('click',function(){
            e.preventDefault();
            $.ajax({
            //url的内容端口号为app.js中设置的端口号
                url:'http://localhost:3000/addData',
                type:'get',
                dataType:'json',
                data:{
                    'mathNum':$('#number-one').val(),
                   //等等
                },
                success:function(result){
                    console.log('success');
                },
                error:function(XHR,textStatus,errorThrown){
                    console.log(XHR.status);
                    console.log(XHR.readyState);
                    console.log(textStatus);
                }
            })
        })
    </script>
```
当上两步完成之后，在命令行中启动：`node app.js`，在浏览器中输出之前设置的添加数据界面的路由，本例中为“ http://localhost:3000/adding ”，可以看到浏览器中已经展示了表格，输入数据之后，点击按钮，就可以在命令行中看到测试的数据显示出来。说明我们已经可以将数据从前端界面穿输入nodejs中，下一步即时从nodejs传输入php，在经php最终传入数据库。  
### PHP文件  
通过封装一个数据库类，实现数据库的增加、查找等（此处在xampp中的默认路径创建`database`文件夹）。
#### 创建封装类：
创建`DB.php`  文件，创建封装类。具体代码：[在Github中查看。](https://github.com/FrankWang1991/FE-Nodejs-PHP-database/blob/master/database/DB.php)
#### 创建写入数据的php文件
创建`get.php`文件。本文件的作用是将nodejs中传来的数据写入到数据库中。所以此时数据库中应该有相应接收数据的表格（此处为`forfetobe`数据库下的`classData` 数据表格）。
![classData表格样式](http://img.blog.csdn.net/20170905234130460?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcGVuZ185/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
具体代码：[在Github中查看。](https://github.com/FrankWang1991/FE-Nodejs-PHP-database/blob/master/database/get.php)  
### 将数据经由php写入到数据库中
上两步的php文件创建完毕之后，将其部署到服务器上。需要使用 `request`模块在nodejs中进行http请求。
首先进行安装：`npm install request --save`，在`app.js`中引入此模块：`var request = require('request');`  
所以可以在接收数据的路由中`addData`中添加`request`请求，将数据发送到`get.php`中，再由其发送到相应数据库中：

```
// 设置路由，用来接受add_data.html传来的数据
app.get('/addData', function(req, res) {
	var responseData =
		"mathNum=" + req.query.mathNum + '&' +
		'等等。。。。。。';
	//此处注意传输的responseData应该为字符串形式，且格式与get请求在浏览器地址栏的格式相一致。  
		request('http://localhost/database/get.php?' + responseData, function(error, response, body) {

	});
})
```  
具体代码在[Github上查看。](https://github.com/FrankWang1991/FE-Nodejs-PHP-database/blob/master/FEfiles/app.js)  
此时，打开相应服务，表格中添加数据，即可以传输到数据库中的相应数据表里。
## 数据库-前端 
上一节文章中，写到从前端写入的数据，经由Nodejs传给php，在由php写入到数据库中。本节文章主要写从数据库将数据拿出来展示到前端去（继续上一节的demo）。
### php文件获取数据库数据  
上一节中封装了一个PDO类，也就是`DB.php`文件。创建此类的一个实例，用来查询数据库中的数据。  
依旧是在xampp中的默认路径创建database文件夹下，新建`back.php`，进行数据库相应数据表的查询，具体代码：[在GitHub上 查看](https://github.com/FrankWang1991/FE-Nodejs-PHP-database/blob/master/database/back.php)。
### 数据取回至Nodejs
通过上面的php可以将数据拿回至php，现在需要将数据 经由nodejs，再将其发送到前端页面上，需要在`app.js`中设置相关路由。
#### 设置数据展示界面路由 

```
//设置路由，用来将数据展示到页面中去
app.get('/showing', function(req, res) {
	res.render('show_data')
});
```  
这个没啥说的，和上一篇中的设置数据写入界面路由相同。都是设置在`views`文件夹下新建相应的html文件，此处是`show_data.html`。  
#### 设置php发送到nodejs上的路由  

```
//设置路由，作用是将来自‘show_data.html’的ajax请求，并将数据库中的数据通过PHP发送至此
app.get('/showData', function(req, res) {
		var responseData =
			"mathNum=" + req.query.mathNum + '&' +
			//等等
request('http://localhost/database/back.php?' + responseData, function(error, response, body) {
		res.json(body);//必须。将数据吐出。
	});
	})；
```  
现在即需要书写`show_data.html`界面，接收数据。
此处需要在`public`文件夹下创建`scripts`、 `css`、 `images`等文件夹来存放相应的静态资源文件。在将静态文件 `.css`、`.js`、`img`放入到`public`文件夹下的相应路径中去。  
此时项目文档结构为：![项目结构](http://img.blog.csdn.net/20170906205025624?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcGVuZ185/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)  

引入路径为：  

```
//show_data.html文件内的样式文件引入路径展示。
<link rel="stylesheet" type="text/css" href="css/layout.css">
```  
在书写完整体的展示界面后，（详细代码在：[GitHub上查看](https://github.com/FrankWang1991/FE-Nodejs-PHP-database/blob/master/FEfiles/views/show_data.html)），  就需要将数据传输到页面中去。  
### 数据展示到页面中去：
在相应的位置书写ajax请求，将`showData` 路由上的数据发送到页面：  

```
$(function() {
  $.ajax({
    url: 'http://localhost:3000/showData',
    dataType: "json",
    success: function(point) {
      var jsondata = JSON.parse(point);
      var datalength = jsondata.length;
      //提取数据库里最近七天内的数据
      var nowAll = Number(jsondata[datalength - 1]["atotalnum"]);
      var nowIncrease = Number(jsondata[datalength - 1]["aincreasenum"]);
	     //。。。
      var sevenAll = Number(jsondata[datalength - 7]["atotalnum"]);
      var sevenIncrease = Number(jsondata[datalength - 7]["aincreasenum"]);
      //以下是使用highcharts 创建表格。
	  //具体代码在Github上查看。
})
```
至此，一个完整的将前端数据通过ajax的get方式发送到Nodejs中，在经由php发送到数据库中，然后再从数据库中拿取最新的数据，展示到界面中。  
整个的展示流程为：  
1. 进入添加数据界面：
![进入增加数据界面](http://img.blog.csdn.net/20170906224615602?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcGVuZ185/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)  
2. 添加数据：![填写数据点击按钮](http://img.blog.csdn.net/20170906224700711?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcGVuZ185/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)  
3. 在展示界面查看：![查看各个课程数据](http://img.blog.csdn.net/20170906224728882?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcGVuZ185/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
