<?php 
class User{ 
    // database connection and table name 
    private $conn; 
    private $table_name = "users"; 
 
    // object properties 
    public $id;
    public $username;
    public $email;
    public $level;
    public $password;
 
    // constructor with $db as database connection 
    public function __construct($db){ 
        $this->conn = $db;
    }
    // read products
    // create product
function create(){
     
    // query to insert record
    $query = "INSERT INTO 
                " . $this->table_name . "
            SET 
                username=:username, email=:email, level=:level, password=:password";
     
    // prepare query
    $stmt = $this->conn->prepare($query);
 
    // posted values
    $this->username=htmlspecialchars(strip_tags($this->username));
    $this->email=htmlspecialchars(strip_tags($this->email));
    $this->level=htmlspecialchars(strip_tags($this->level));
    $this->password=htmlspecialchars(strip_tags($this->password));
 
    // bind values
    $stmt->bindParam(":username", $this->username);
    $stmt->bindParam(":email", $this->email);
    $stmt->bindParam(":level", $this->level);
    $stmt->bindParam(":password", $this->password);
     
    // execute query
    if($stmt->execute()){
        return true;
    }else{
        echo "<pre>";
            print_r($stmt->errorInfo());
        echo "</pre>";
 
        return false;
    }
}
	function read(){
	 
	    // select all query
	    $query = "SELECT
	                id, username, email, level
	            FROM
	                " . $this->table_name . "
	            ORDER BY
	                id DESC";
	 
	    // prepare query statement
	    $stmt = $this->conn->prepare( $query );
	 
	    // execute query
	    $stmt->execute();
	 
	    return $stmt;
	}
    function check($username,$password){
     
        // select all query
        $query = "SELECT
                    id, username, email, level
                FROM
                    " . $this->table_name . "
                WHERE
                    username = '".$username."' AND password = '".$password."'
                ";
        // prepare query statement
        $stmt = $this->conn->prepare( $query );
        // execute query
        $stmt->execute();
     
        return $stmt;
    }
	function update(){
 
    // update query
    $query = "UPDATE
                " . $this->table_name . "
            SET
                username=:username, email=:email, level=:level, password=:password
            WHERE
                id = :id";
 
    // prepare query statement
    $stmt = $this->conn->prepare($query);
 
    // sanitize
    $this->username=htmlspecialchars(strip_tags($this->username));
    $this->email=htmlspecialchars(strip_tags($this->email));
    $this->level=htmlspecialchars(strip_tags($this->level));
    $this->password=htmlspecialchars(strip_tags($this->password));
    $this->id=htmlspecialchars(strip_tags($this->id));
 
    // bind new values
    $stmt->bindParam(":username", $this->username);
    $stmt->bindParam(":email", $this->email);
    $stmt->bindParam(":level", $this->level);
    $stmt->bindParam(":password", $this->password);
    $stmt->bindParam(':id', $this->id);
 
    // execute the query
    if($stmt->execute()){
        return true;
    }else{
        return false;
    }
}
// delete the product
function delete(){
 
    // delete query
    $query = "DELETE FROM " . $this->table_name . " WHERE id = ?";
 
    // prepare query
    $stmt = $this->conn->prepare($query);
 
    // sanitize
    $this->id=htmlspecialchars(strip_tags($this->id));
 
    // bind id of record to delete
    $stmt->bindParam(1, $this->id);
 
    // execute query
    if($stmt->execute()){
        return true;
    }
 
    return false;
}
}
?>