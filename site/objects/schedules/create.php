<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: multipart/form-data; charset=UTF-8");
// include database and object file
include_once '../../config/database.php';
include_once 'schedule.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// instantiate product object
$plan = new Schedule($db);

if(isset($_POST['department_id'])){
	$department_id = $_POST['department_id'];
}
if(isset($_POST['title_uk'])){
	$group_title_uk = $_POST['title_uk'];
}
if(isset($_POST['title_ru'])){
	$group_title_ru = $_POST['title_ru'];
}
if(isset($_POST['title_en'])){
	$group_title_en = $_POST['title_en'];
}


if ( !empty( $_FILES ) ) {

	$pdf_name = $_FILES[ 'file' ][ 'name' ];
	$tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
	$uploadPath = $_SERVER['DOCUMENT_ROOT'] .'/assets/pdf/schedule/' . $pdf_name;

	move_uploaded_file( $tempPath, $uploadPath );

	echo "PDF was uploaded. ";

	$plan->group_title_uk = $group_title_uk;
	$plan->group_title_ru = $group_title_ru;
	$plan->group_title_en = $group_title_en;
	$plan->pdf_name = $pdf_name;
	$plan->department_id = $department_id;
	 
	// create the product
	if($plan->create()){
	    echo "Schedule was created.";
	}
 
// if unable to create the product, tell the user
else{
    echo "Unable to create plan.";
}
	
    

} else {

    echo 'No files uploaded';

}
// set product property values

?>