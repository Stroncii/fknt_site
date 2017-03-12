<?php
// include database and object file
include_once '/config/database.php';
include_once '/news/news.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// instantiate product object
$news = new News($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
 
// set product property values
/*$product->name = $data->name;
$product->price = $data->price;
$product->description = $data->description;
$product->created = date('Y-m-d H:i:s');*/
 // create product
function create(){
     
    // query to insert record
    $query = "INSERT INTO 
                " . $this->table_name . "
            SET 
                name=:name, price=:price, description=:description, created=:created";
     
    // prepare query
    $stmt = $this->conn->prepare($query);
 
    // posted values
    $this->name=htmlspecialchars(strip_tags($this->name));
    $this->price=htmlspecialchars(strip_tags($this->price));
    $this->description=htmlspecialchars(strip_tags($this->description));
 
    // bind values
    $stmt->bindParam(":name", $this->name);
    $stmt->bindParam(":price", $this->price);
    $stmt->bindParam(":description", $this->description);
    $stmt->bindParam(":created", $this->created);
     
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
// create the product
if($news->create()){
    echo "Product was created.";
}
 
// if unable to create the product, tell the user
else{
    echo "Unable to create product.";
}
?>