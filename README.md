# FE-Nodejs-PHP-database
从前端写入输入（或从其他网站爬下数据）到将数据通过nodejs传给php继而写入数据库，在从数据库拿出数据展示到新的界面上。
### 开始准备工作  
#### 创建项目文件夹-FEtoBE：
在命令行使用`npm init `初始化项目文件夹，填写项目名称等一系列，或者一路`enter`，结束后项目文件会出现一个新文件`package.json`，就是刚才填写的或默认的数据。
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
