<?php 
// include database and object files 
include_once '../../config/database.php';
include_once 'plan.php';
 
// get database connection 
$database = new Database(); 
$db = $database->getConnection();
 
// prepare product object
$plan = new Plan($db);
 
// get id of product to be edited
$data = json_decode(file_get_contents("php://input"));     
 
// set ID property of product to be edited
$plan->id = $data->id;
 
// set product property values
$plan->group_title = $data['group_title'];
$plan->pdf_url = $data['pdf_url'];
$plan->department_id = $data['department_id'];
 
// update the product
if($plan->update()){
    echo "Plan was updated.";
}
 
// if unable to update the product, tell the user
else{
    echo "Unable to update plan.";
}
?>