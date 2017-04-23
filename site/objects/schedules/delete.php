<?php 
// include database and object file 
include_once '../../config/database.php';
include_once 'schedule.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// instantiate product object
$plan = new Schedule($db);
 
// get product id
$data = json_decode(file_get_contents("php://input"),true);     
 
// set product id to be deleted
$plan->id = $data['id'];
$plan->pdf_name = $data['pdf'];
 
// delete the product
if($plan->delete()){
    echo "Schedule was deleted.";
}
 
// if unable to delete the product
else{
    echo "Unable to delete object.";
}
?>