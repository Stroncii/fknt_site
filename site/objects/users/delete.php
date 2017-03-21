<?php 
// include database and object file 
include_once '/config/database.php';
include_once 'user.php';
 
// get database connection 
$database = new Database(); 
$db = $database->getConnection();
 
// prepare product object
$user = new User($db);
 
// get product id
$data = json_decode(file_get_contents("php://input"));     
 
// set product id to be deleted
$user->id = $data->id;
 
// delete the product
if($user->delete()){
    echo "User was deleted.";
}
 
// if unable to delete the product
else{
    echo "Unable to delete object.";
}
?>