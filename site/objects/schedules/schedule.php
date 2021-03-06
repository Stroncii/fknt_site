<?php 
class Schedule{ 
    // database connection and table name 
    private $conn; 
    private $table_name = "schedules"; 
 
    // object properties 
    public $id;
    public $group_title_uk;
    public $group_title_ru;
    public $group_title_en;
    public $pdf_name;
    public $department_id;
    public $sort_order;
 
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
                group_title_uk=:group_title_uk, group_title_ru=:group_title_ru, group_title_en=:group_title_en, pdf_name=:pdf_name, department_id=:department_id";
     
    // prepare query
    $stmt = $this->conn->prepare($query);
 
    // posted values
    $this->group_title_uk=htmlspecialchars(strip_tags($this->group_title_uk));
    $this->group_title_ru=htmlspecialchars(strip_tags($this->group_title_ru));
    $this->group_title_en=htmlspecialchars(strip_tags($this->group_title_en));
    $this->pdf_name=htmlspecialchars(strip_tags($this->pdf_name));
    $this->department_id=htmlspecialchars(strip_tags($this->department_id));
    
    // bind values
    $stmt->bindParam(":group_title_uk", $this->group_title_uk);
    $stmt->bindParam(":group_title_ru", $this->group_title_ru);
    $stmt->bindParam(":group_title_en", $this->group_title_en);
    $stmt->bindParam(":pdf_name", $this->pdf_name);
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
                    id, sort_order, group_title_uk,group_title_ru,group_title_en,pdf_name,department_id
                FROM
                    " . $this->table_name . "
                ORDER BY
                    coalesce(sort_order, id) ASC";
     
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
                group_title_uk=:group_title_uk, group_title_ru=:group_title_ru, group_title_en=:group_title_en, ".($this->pdf_name==""?'':'pdf_name=:pdf_name,')." department_id=:department_id
            WHERE
                id = :id";
    //echo $query;
    // prepare query statement
    $stmt = $this->conn->prepare($query);
 
    // sanitize
    $this->group_title_uk=htmlspecialchars(strip_tags($this->group_title_uk));
    $this->group_title_ru=htmlspecialchars(strip_tags($this->group_title_ru));
    $this->group_title_en=htmlspecialchars(strip_tags($this->group_title_en));
    //$this->pdf_name=htmlspecialchars(strip_tags($this->pdf_name));
    $this->department_id=htmlspecialchars(strip_tags($this->department_id));
    $this->id=htmlspecialchars(strip_tags($this->id));
 
    // bind new values
    $stmt->bindParam(":group_title_uk", $this->group_title_uk);
    $stmt->bindParam(":group_title_ru", $this->group_title_ru);
    $stmt->bindParam(":group_title_en", $this->group_title_en);
    if($this->pdf_name!=""){
        $stmt->bindParam(":pdf_name", $this->pdf_name);
        echo "wtf!";
    }
    $stmt->bindParam(":department_id", $this->department_id);
    $stmt->bindParam(':id', $this->id);
 
    // execute the query
    if($stmt->execute()){
        return true;
    }else{
        return false;
    }
}
function updatePosition(){
    // update query
    $query = "UPDATE
                " . $this->table_name . "
            SET
                sort_order=:sort_order
            WHERE
                id = :id";
 
    // prepare query statement
    $stmt = $this->conn->prepare($query);
 
    // sanitize
    $this->sort_order=htmlspecialchars(strip_tags($this->sort_order));
 
    // bind new values
    $stmt->bindParam(":sort_order", $this->sort_order);
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
    $pdf = htmlspecialchars(strip_tags($this->pdf_name));
    // bind id of record to delete
    $stmt->bindParam(1, $this->id);
 
    // execute query
    if($stmt->execute()){
        unlink($_SERVER['DOCUMENT_ROOT'] .'/assets/pdf/schedule/'.$pdf);
        return true;
    }
 
    return false;
}
}
?>