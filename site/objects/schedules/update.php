<?php 
// include database and object files 
include_once '../../config/database.php';
include_once 'schedule.php';
 
// get database connection 
$database = new Database(); 
$db = $database->getConnection();
 
// prepare product object
$schedule = new Schedule($db);
 
// get id of product to be edited
$data = json_decode(file_get_contents("php://input"));     
 
// set ID property of product to be edited
$schedule->id = $data->id;
 
// set product property values
$schedule->group_title = $data['group_title'];
$schedule->pdf_url = $data['pdf_url'];
$schedule->department_id = $data['department_id'];
 
// update the product
if($schedule->update()){
    echo "Schedule was updated.";
}
 
// if unable to update the product, tell the user
else{
    echo "Unable to update schedule.";
}
?>