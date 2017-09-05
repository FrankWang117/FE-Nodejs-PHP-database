<?php
// 以PDO的形式封装类，并添加查询等sql语句
class DB
{
	/*** mysql hostname ***/
	private $hostname = 'localhost'; // Put your host name here
	/*** mysql username ***/
	private $username = 'root'; // Put your MySQL User name here
	/*** mysql password ***/
	private $password = ''; // Put Your MySQL Password here
	/*** mysql database ***/
	private $dbName   = 'forfetobe'; // Put Your MySQL Database name here
	/*** database resource ***/
	public $dbh = NULL; // Database handler
	//默认构造函数
	public function __construct() // Default Constructor
	{
		try
		{
			$this->dbh = new PDO("mysql:host=$this->hostname;dbname=$this->dbName", $this->username, $this->password);
			/*** echo a message saying we have connected ***/
			// echo 'Connected to database'; // Test with this string
		}
		catch(PDOException $e)
		{
			echo __LINE__.$e->getMessage();
		}
	}
	//设置关闭连接
	public function __destruct()
	{
		$this->dbh = NULL; // Setting the handler to NULL closes the connection propperly
	}
	//设置具体数据库交互业务
	public function runQuery($sql)
	{
		try
		{
			//echo $sql;
			$count = $this->dbh->exec($sql) or print_r($this->dbh->errorInfo());
			return  $count;
		}
		catch(PDOException $e)
		{
			echo __LINE__.$e->getMessage();
		}
	}
	//从数据库里查询数据并返回数据数组
	public function getQuery($sql)
	{
		$stmt = $this->dbh->query($sql);
	    $stmt->setFetchMode(PDO::FETCH_ASSOC);
		return $stmt; // Returns an associative array that can be diectly accessed or looped through with While or Foreach
	}
}
?>
