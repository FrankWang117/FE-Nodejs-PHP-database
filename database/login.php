<html>
<body>
<?php

	$database = "mysql:host=localhost;dbname=forfetobe";
	try{
		$conn = new PDO ($database,"root","");
		$conn->query("SET NAMES utf8");
		$uname=$_POST["uname"];
		$upassword = $_POST["upwd"];
		$sql_select = "select `username`,`userpassword`,`email` from `usertable` where username = '$uname'";
		$result = $conn->query($sql_select);
		$result_data=$result->fetch(PDO::FETCH_ASSOC);
			if ($result_data['username']==$uname) {
				if ($result_data['userpassword']==$upassword) {
					echo '<script type="text/javascript">window.location.href="http://localhost:3000/showing"</script>';
				}
				else{
					echo "<script>alert('密码错误')</script>";
					echo '<script type="text/javascript">window.location.href="http://localhost:3000/signin"</script>';
				}
			}
			else{
				echo "<script>alert('无此用户，请注册')</script>";
				echo '<script type="text/javascript">window.location.href="http://localhost:3000/signin"</script>';
			}

	}
	catch(PDOException $e){
		echo "<br>PDO异常信息".$e->getMessage();
	}
?>
</body>
</html>
