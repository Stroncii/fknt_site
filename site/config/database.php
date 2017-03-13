<?php


class Database{ 
 
    // specify your own database credentials 
    /*private $host = "sql200.byethost18.com"; 
    private $db_name = "b18_19812321_knt"; 
    private $username = "b18_19812321"; 
    private $password = "ab07You09";*/
    private $host = "localhost";
   	private $db_name = "knt"; 
    private $username = "root"; 
    private $password = "root"; 
    public $conn; 
 
    // get the database connection 
    public function getConnection(){ $this->conn = null;
         
        try{
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
        }catch(PDOException $exception){
            echo "Connection error: " . $exception->getMessage();
        }
         
        return $this->conn;
    }
}

?>