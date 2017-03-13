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
    public $images_nums;
    public $created;
    public $modified;
 
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
                title_uk=:title_uk, title_ru=:title_ru, title_en=:title_en, full_text_uk=:full_text_uk, full_text_ru=:full_text_ru, full_text_en=:full_text_en, short_text_uk=:short_text_uk, short_text_ru=:short_text_ru, short_text_en=:short_text_en, images_nums=:images_nums";
     
    // prepare query
    $stmt = $this->conn->prepare($query);
 
    // posted values
    $this->title_uk=htmlspecialchars(strip_tags($this->title_uk));
    $this->title_ru=htmlspecialchars(strip_tags($this->title_ru));
    $this->title_en=htmlspecialchars(strip_tags($this->title_en));
    $this->full_text_uk=htmlspecialchars(strip_tags($this->full_text_uk));
    $this->full_text_ru=htmlspecialchars(strip_tags($this->full_text_ru));
    $this->full_text_en=htmlspecialchars(strip_tags($this->full_text_en));
    $this->short_text_uk=htmlspecialchars(strip_tags($this->short_text_uk));
    $this->short_text_ru=htmlspecialchars(strip_tags($this->short_text_ru));
    $this->short_text_en=htmlspecialchars(strip_tags($this->short_text_en));
    $this->images_nums=htmlspecialchars(strip_tags($this->images_nums));
 
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
    $stmt->bindParam(":images_nums", $this->images_nums);
     
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
	function readAll($lang){
	 
	    // select all query
	    $query = "SELECT
	                id, title_".$lang.", short_text_".$lang.", full_text_".$lang.", images_nums
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
	function readLast($lang){
	 
	    // select all query
	    $query = "SELECT
	                id, title_".$lang.", short_text_".$lang.", full_text_".$lang.", images_nums
	            FROM
	                " . $this->table_name . "
	            ORDER BY
	                id DESC
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
	                id, title_".$lang.", short_text_".$lang.", full_text_".$lang.", images_nums
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
                title_uk=:title_uk, title_ru=:title_ru, title_en=:title_en, full_text_uk=:full_text_uk, full_text_ru=:full_text_ru, full_text_en=:full_text_en, short_text_uk=:short_text_uk, short_text_ru=:short_text_ru, short_text_en=:short_text_en, images_nums=:images_nums
            WHERE
                id = :id";
 
    // prepare query statement
    $stmt = $this->conn->prepare($query);
 
    // sanitize
    $this->title_uk=htmlspecialchars(strip_tags($this->title_uk));
    $this->title_ru=htmlspecialchars(strip_tags($this->title_ru));
    $this->title_en=htmlspecialchars(strip_tags($this->title_en));
    $this->full_text_uk=htmlspecialchars(strip_tags($this->full_text_uk));
    $this->full_text_ru=htmlspecialchars(strip_tags($this->full_text_ru));
    $this->full_text_en=htmlspecialchars(strip_tags($this->full_text_en));
    $this->short_text_uk=htmlspecialchars(strip_tags($this->short_text_uk));
    $this->short_text_ru=htmlspecialchars(strip_tags($this->short_text_ru));
    $this->short_text_en=htmlspecialchars(strip_tags($this->short_text_en));
    $this->images_nums=htmlspecialchars(strip_tags($this->images_nums));
    $this->id=htmlspecialchars(strip_tags($this->id));
 
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
    $stmt->bindParam(":images_nums", $this->images_nums);
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