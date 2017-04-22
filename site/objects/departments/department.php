<?php 
class Department{ 
    // database connection and table name 
    private $conn; 
    private $table_name = "departments"; 
 
    // object properties 
    public $id;
    public $name_uk;
    public $name_ru;
    public $name_en;
 
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
                name_uk=:name_uk, name_ru=:name_ru, name_en=:name_en";
     
    // prepare query
    $stmt = $this->conn->prepare($query);
 
    // posted values
    $this->name_uk=htmlspecialchars(strip_tags($this->name_uk));
    $this->name_ru=htmlspecialchars(strip_tags($this->name_ru));
    $this->name_en=htmlspecialchars(strip_tags($this->name_en));
 
    // bind values
    $stmt->bindParam(":name_uk", $this->name_uk);
    $stmt->bindParam(":name_ru", $this->name_ru);
    $stmt->bindParam(":name_en", $this->name_en);
     
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
	                id, name_uk,name_ru,name_en
	            FROM
	                " . $this->table_name . "
	            ORDER BY
	                id ASC";
	 
	    // prepare query statement
	    $stmt = $this->conn->prepare( $query );
	
	    // execute query
	    $stmt->execute();
	 
	    return $stmt;
	}
    function readOne($id){
     
        // select all query
        $query = "SELECT
                    id, name_uk,name_ru,name_en
                FROM
                    " . $this->table_name . "
                WHERE
                    id = ".$id;
     
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
                name_uk=:name_uk, name_ru=:name_ru, name_en=:name_en
            WHERE
                id = :id";
 
    // prepare query statement
    $stmt = $this->conn->prepare($query);
 
    // sanitize
    $this->name_uk=htmlspecialchars(strip_tags($this->name_uk));
    $this->name_ru=htmlspecialchars(strip_tags($this->name_ru));
    $this->name_en=htmlspecialchars(strip_tags($this->name_en));
 
    // bind new values
    $stmt->bindParam(":name_uk", $this->name_uk);
    $stmt->bindParam(":name_ru", $this->name_ru);
    $stmt->bindParam(":name_en", $this->name_en);
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