<?php
header("Content-type: application/json; charset=utf-8");
// $state  = (isset($_GET['state']))? htmlspecialchars($_GET['state']) :null;
//引入封装类
require_once('DB.php');
//创建类的实例
$dataBase = new DB;
// 设置 查询 表的信息
$sqlSelect = "SELECT * FROM classData";
//使用封装好的 getQuery函数
$rows = $dataBase->getQuery($sqlSelect);
//将数据库中的数据循环出来
foreach($rows as $reg) {
//将所有数据变成数组形式，并以json的形式返回
    $data[] = array(
                    // "id"   => $reg['id'],
                    "atotalnum" =>$reg['atotalnum'],
                    "aincreasenum" =>$reg['aincreasenum'],
                    "btotalnum" =>$reg['btotalnum'],
                    "bincreasenum" =>$reg['bincreasenum'],
                    "ctotalnum" =>$reg['ctotalnum'],
                    "cincreasenum" =>$reg['cincreasenum'],
                    "dtotalnum" =>$reg['dtotalnum'],
                    "dincreasenum" =>$reg['dincreasenum']
                    // "number" => utf8_encode(addslashes($reg['number']))
                   );
}
echo json_encode($data);
?>
