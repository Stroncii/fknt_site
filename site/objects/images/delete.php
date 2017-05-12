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
//$data = array();
//$data['path'] = "/assets/img/news/items/74.jpg"; 

// set product id to be deleted
$part1 = explode('/',$data['path']);
$part2 = explode('.',$part1[5]);
$image->id = $part2[0];
// delete the product
if($image->delete()){
    echo "Image was deleted .".$part2[0];
}
 
// if unable to delete the product
else{
    echo "Unable to delete object.";
}
?>