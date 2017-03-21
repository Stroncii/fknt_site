<?php
// include database and object file
include_once '../../config/database.php';
include_once 'department.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// instantiate product object
$dep = new Department($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
 
// set product property values
$dep->name_uk = $data['name_uk'];
$dep->name_ru = $data['name_ru'];
$dep->name_en = $data['name_en'];
 
// create the product
if($dep->create()){
    echo "Department was created.";
}
 
// if unable to create the product, tell the user
else{
    echo "Unable to create department.";
}
?>