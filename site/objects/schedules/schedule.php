<?php 
class Schedule{ 
    // database connection and table name 
    private $conn; 
    private $table_name = "schedules"; 
 
    // object properties 
    public $id;
    public $group_title;
    public $pdf_url;
    public $department_id;
    public $position;
 
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
                group_title=:group_title, pdf_url=:pdf_url, department_id=:department_id";
     
    // prepare query
    $stmt = $this->conn->prepare($query);
 
    // posted values
    $this->group_title=htmlspecialchars(strip_tags($this->group_title));
    $this->pdf_url=htmlspecialchars(strip_tags($this->pdf_url));
    $this->department_id=htmlspecialchars(strip_tags($this->department_id));
 
    // bind values
    $stmt->bindParam(":group_title", $this->group_title);
    $stmt->bindParam(":pdf_url", $this->pdf_url);
    $stmt->bindParam(":department_id", $this->department_id);
     
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
                    id, group_title,pdf_url,department_id, position
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
    
    function update(){
 
    // update query
    $query = "UPDATE
                " . $this->table_name . "
            SET
                group_title,pdf_url,department_id
            WHERE
                id = :id";
 
    // prepare query statement
    $stmt = $this->conn->prepare($query);
 
    // sanitize
    $this->group_title=htmlspecialchars(strip_tags($this->group_title));
    $this->pdf_url=htmlspecialchars(strip_tags($this->pdf_url));
    $this->department_id=htmlspecialchars(strip_tags($this->department_id));
 
    // bind new values
    $stmt->bindParam(":group_title", $this->group_title);
    $stmt->bindParam(":pdf_url", $this->pdf_url);
    $stmt->bindParam(":department_id", $this->department_id);
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