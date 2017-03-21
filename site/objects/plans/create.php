<?php
// include database and object file
include_once '../../config/database.php';
include_once 'plan.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// instantiate product object
$plan = new Plan($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
 
// set product property values
$plan->group_title = $data['group_title'];
$plan->pdf_url = $data['pdf_url'];
$plan->department_id = $data['department_id'];
 
// create the product
if($plan->create()){
    echo "Plan was created.";
}
 
// if unable to create the product, tell the user
else{
    echo "Unable to create plan.";
}
?>