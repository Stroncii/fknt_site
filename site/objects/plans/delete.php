<?php 
// include database and object file 
include_once '../../config/database.php';
include_once 'plan.php';
 
// get database connection 
$database = new Database(); 
$db = $database->getConnection();
 
// prepare product object
$plan = new Plan($db);
 
// get product id
$data = json_decode(file_get_contents("php://input"));     
 
// set product id to be deleted
$plan->id = $data->id;
 
// delete the product
if($plan->delete()){
    echo "Plan was deleted.";
}
 
// if unable to delete the product
else{
    echo "Unable to delete object.";
}
?>