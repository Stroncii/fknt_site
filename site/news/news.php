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
 
    // constructor with $db as database connection 
    public function __construct($db){ 
        $this->conn = $db;
    }
    // read products
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
}
?>