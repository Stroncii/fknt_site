<?php 
// include database and object files 
include_once '../../config/database.php';
include_once 'image.php';
 
// get database connection 
$database = new Database(); 
$db = $database->getConnection();
 
// prepare product object
$user = new User($db);
 
// get id of product to be edited
$data = json_decode(file_get_contents("php://input"),true);     
 
// set ID property of product to be edited
$user->id = $data['id'];
 
// set product property values
$user->username = $data['username'];
$user->email = $data['email'];
$user->level = $data['level'];
$user->password = md5($data['password']);
 
// update the product
if($user->update()){
    echo "User was updated.";
}
 
// if unable to update the product, tell the user
else{
    echo "Unable to update user.";
}
?>