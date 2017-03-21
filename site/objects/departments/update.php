<?php 
// include database and object files 
include_once '../../config/database.php';
include_once 'department.php';
 
// get database connection 
$database = new Database(); 
$db = $database->getConnection();
 
// prepare product object
$dep = new Department($db);
 
// get id of product to be edited
$data = json_decode(file_get_contents("php://input"));     
 
// set ID property of product to be edited
$dep->id = $data->id;
 
// set product property values
$dep->name_uk = $data['name_uk'];
$dep->name_ru = $data['name_ru'];
$dep->name_en = $data['name_en'];
 
// update the product
if($product->update()){
    echo "Department was updated.";
}
 
// if unable to update the product, tell the user
else{
    echo "Unable to update department.";
}
?>