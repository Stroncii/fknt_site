<?php 
// include database and object file 
include_once '../../config/database.php';
include_once 'department.php';
 
// get database connection 
$database = new Database(); 
$db = $database->getConnection();
 
// prepare product object
$news = new Department($db);
 
// get product id
$data = json_decode(file_get_contents("php://input"));     
 
// set product id to be deleted
$news->id = $data->id;
 
// delete the product
if($news->delete()){
    echo "Department was deleted.";
}
 
// if unable to delete the product
else{
    echo "Unable to delete object.";
}
?>