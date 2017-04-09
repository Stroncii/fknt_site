<?php 
class Image{ 
    // database connection and table name 
    private $conn; 
    private $table_name = "images"; 
 
    // object properties 
    public $id;
    public $news_id;
 
    // constructor with $db as database connection 
    public function __construct($db){ 
        $this->conn = $db;
    }
    // read products
    // create product
function create(){
     
    // query to insert record
    $query = "INSERT INTO 
                " . $this->table_name . "";
     
    // prepare query
    $stmt = $this->conn->prepare($query);
 
     
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
	function readAll(){
	 
	    // select all query
	    $query = "SELECT
	                id, news_id
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
    function read($n_id){
        // select all query
        $query = "SELECT
                    id, news_id
                FROM
                    " . $this->table_name . "
                WHERE
                    news_id = ".htmlspecialchars(strip_tags($n_id))."
                ORDER BY
                    id ASC";
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
                news_id=:news_id
            WHERE
                id = :id";
 
    // prepare query statement
    $stmt = $this->conn->prepare($query);
 
    // sanitize
    $this->news_id=htmlspecialchars(strip_tags($this->news_id));
    $this->id=htmlspecialchars(strip_tags($this->id));
 
    // bind new values
    $stmt->bindParam(":news_id", $this->news_id);
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
    $id = $this->id;
    // bind id of record to delete
    $stmt->bindParam(1, $this->id);
 
    // execute query
    if($stmt->execute()){
        unlink('/assets/img/news/items/'.$id.'.jpg');
        return true;
    }
 
    return false;
}
}
?>