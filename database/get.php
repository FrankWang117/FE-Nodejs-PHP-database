<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin：*");//解决ajax请求跨域问题
//引入数据库的封装类的另一种方法PDO
include('DB.php');
//实例化类
$dataBase = new DB;
//接收node（app.js）中路由（/index/add）参数
$atotalnum=$_GET["mathNum"];
$aincreasenum=$_GET["mathAdd"];
$btotalnum=$_GET["engNum"];
$bincreasenum=$_GET["engAdd"];
$ctotalnum=$_GET["ccNum"];
$cincreasenum=$_GET["ccAdd"];
$dtotalnum=$_GET["freeNum"];
$dincreasenum=$_GET["freeAdd"];

//定义查询sql语句:查询数据表的所有字段，插入到数据库中
$result = $dataBase->runQuery("INSERT INTO classData (atotalnum,aincreasenum,btotalnum,bincreasenum,ctotalnum,cincreasenum,dtotalnum,dincreasenum)VALUES ('$atotalnum','$aincreasenum','$btotalnum','$bincreasenum','$ctotalnum','$cincreasenum','$dtotalnum','$dincreasenum')");

// include('city.php');
// if ($result > 1) {
// 	echo json_encode(array('result' =>"ok" ));
// }else{
// 	echo json_encode(array('result' =>"no" ));
// }
// header("Content-type:application/json;charset=UTF-8");
// $data=json_decode($_GET['AllFENum']);
// echo($data);
// https://github.com/correaecastro/select2-json-php-mysql-bootstrap-jquery/blob/master/city.php
?>

