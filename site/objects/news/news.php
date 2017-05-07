<?php 
class News{ 
    // database connection and table name 
    private $conn; 
    private $table_name = "news"; 
 
    // object properties 
    public $id;
    public $title_uk;
    public $title_ru;
    public $title_en;
    public $full_text_uk;
    public $full_text_ru;
    public $full_text_en;
    public $short_text_uk;
    public $short_text_ru;
    public $short_text_en;
    public $created;
    public $modified;
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
                title_uk=:title_uk, title_ru=:title_ru, title_en=:title_en, full_text_uk=:full_text_uk, full_text_ru=:full_text_ru, full_text_en=:full_text_en, short_text_uk=:short_text_uk, short_text_ru=:short_text_ru, short_text_en=:short_text_en";
     
    // prepare query
    $stmt = $this->conn->prepare($query);
 
    // posted values
    $this->title_uk=$this->title_uk;
    $this->title_ru=$this->title_ru;
    $this->title_en=$this->title_en;
    $this->full_text_uk=$this->full_text_uk;
    $this->full_text_ru=$this->full_text_ru;
    $this->full_text_en=$this->full_text_en;
    $this->short_text_uk=$this->short_text_uk;
    $this->short_text_ru=$this->short_text_ru;
    $this->short_text_en=$this->short_text_en;
 
    // bind values
    $stmt->bindParam(":title_uk", $this->title_uk);
    $stmt->bindParam(":title_ru", $this->title_ru);
    $stmt->bindParam(":title_en", $this->title_en);
    $stmt->bindParam(":full_text_uk", $this->full_text_uk);
    $stmt->bindParam(":full_text_ru", $this->full_text_ru);
    $stmt->bindParam(":full_text_en", $this->full_text_en);
    $stmt->bindParam(":short_text_uk", $this->short_text_uk);
    $stmt->bindParam(":short_text_ru", $this->short_text_ru);
    $stmt->bindParam(":short_text_en", $this->short_text_en);
     
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
    function readAllLang($id){
     
        // select all query
        $query = "SELECT
                    id,title_uk,title_ru,title_en,full_text_uk,full_text_ru,full_text_en,short_text_uk,short_text_ru,short_text_en
                FROM
                    " . $this->table_name . "
                WHERE 
                    id = ".$id."";
     
        // prepare query statement
        $stmt = $this->conn->prepare( $query );
     
        // execute query
        $stmt->execute();
     
        return $stmt;
    }
	function readAll($lang){
	 
	    // select all query
	    $query = "SELECT
	                id,sort_order, title_".$lang.", short_text_".$lang.", full_text_".$lang."
	            FROM
	                " . $this->table_name . "
	            ORDER BY
	                coalesce(sort_order, id) DESC";
	 
	    // prepare query statement
	    $stmt = $this->conn->prepare( $query );
	 
	    // execute query
	    $stmt->execute();
	 
	    return $stmt;
	}
	function readLast($lang){
	 
	    // select all query
	    $query = "SELECT
	                id, title_".$lang.", short_text_".$lang.", full_text_".$lang."
	            FROM
	                " . $this->table_name . "
	            ORDER BY
	                coalesce(sort_order, id) DESC
	            LIMIT 0,4";
	 
	    // prepare query statement
	    $stmt = $this->conn->prepare( $query );
	 
	    // execute query
	    $stmt->execute();
	 
	    return $stmt;
	}
	function readOne($lang,$id){
	 
	    // select all query
	    $query = "SELECT
	                id, title_".$lang.", short_text_".$lang.", full_text_".$lang."
	            FROM
	                " . $this->table_name . "
	            WHERE 
                	id = ".$id."";
	 
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
                title_uk=:title_uk, title_ru=:title_ru, title_en=:title_en, full_text_uk=:full_text_uk, full_text_ru=:full_text_ru, full_text_en=:full_text_en, short_text_uk=:short_text_uk, short_text_ru=:short_text_ru, short_text_en=:short_text_en,modified=NOW()
            WHERE
                id = :id";
 
    // prepare query statement
    $stmt = $this->conn->prepare($query);
 
    // sanitize
    $this->title_uk=$this->title_uk;
    $this->title_ru=$this->title_ru;
    $this->title_en=$this->title_en;
    $this->full_text_uk=$this->full_text_uk;
    $this->full_text_ru=$this->full_text_ru;
    $this->full_text_en=$this->full_text_en;
    $this->short_text_uk=$this->short_text_uk;
    $this->short_text_ru=$this->short_text_ru;
    $this->short_text_en=$this->short_text_en;
 
    // bind new values
    $stmt->bindParam(":title_uk", $this->title_uk);
    $stmt->bindParam(":title_ru", $this->title_ru);
    $stmt->bindParam(":title_en", $this->title_en);
    $stmt->bindParam(":full_text_uk", $this->full_text_uk);
    $stmt->bindParam(":full_text_ru", $this->full_text_ru);
    $stmt->bindParam(":full_text_en", $this->full_text_en);
    $stmt->bindParam(":short_text_uk", $this->short_text_uk);
    $stmt->bindParam(":short_text_ru", $this->short_text_ru);
    $stmt->bindParam(":short_text_en", $this->short_text_en);
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