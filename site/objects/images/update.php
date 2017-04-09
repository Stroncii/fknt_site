<?php 
// include database and object files 
include_once '../../config/database.php';
include_once 'image.php';
 
// get database connection 
$database = new Database(); 
$db = $database->getConnection();
 
// prepare product object
$image = new Image($db);
 
// get id of product to be edited
$data = json_decode(file_get_contents("php://input"),true);     
 
// set ID property of product to be edited
$image->id = explode('.',explode('/',$data['path'])[5])[0];
 
// set product property values
$image->news_id = $data['news_id'];
 
// update the product
if($image->update()){
    echo "Image was updated.";
}
 
// if unable to update the product, tell the user
else{
    echo "Unable to update image.";
}
?>