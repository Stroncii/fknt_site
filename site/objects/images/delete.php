<?php 
// include database and object file 
include_once '../../config/database.php';
include_once 'image.php';
 
// get database connection 
$database = new Database(); 
$db = $database->getConnection();
 
// prepare product object
$image = new Image($db);
 
// get product id
$data = json_decode(file_get_contents("php://input"),true);     
 
// set product id to be deleted

$image->id = explode('.',explode('/',$data['path'])[5])[0];
 
// delete the product
if($image->delete()){
    echo "Image was deleted.";
}
 
// if unable to delete the product
else{
    echo "Unable to delete object.";
}
?>