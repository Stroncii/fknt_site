<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: multipart/form-data\n; charset=UTF-8");
// include database and object file
include_once '../../config/database.php';
include_once 'schedule.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// instantiate product object
$plan = new Schedule($db);
 
if(isset($_POST['department_id'])){
	$plan->department_id = $_POST['department_id'];
}
if(isset($_POST['group_title_uk'])){
	$plan->group_title_uk = $_POST['title_uk'];
}
if(isset($_POST['group_title_ru'])){
	$plan->group_title_ru = $_POST['title_ru'];
}
if(isset($_POST['group_title_en'])){
	$plan->group_title_en = $_POST['title_en'];
}
if(isset($_POST['id'])){
	$plan->id = $_POST['id'];
}

$pdf_name = "";

if ( !empty( $_FILES ) ) {

	$pdf_name = $_FILES[ 'file' ][ 'name' ];
	$tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
	$uploadPath = $_SERVER['DOCUMENT_ROOT'] .'/assets/pdf/schedule/' . $pdf_name;

	move_uploaded_file( $tempPath, $uploadPath );

	echo "PDF was uploaded. ";
	
    

} else {

    echo 'No files uploaded. ';
    unset($pdf_name);

}

	if(isset($pdf_name)){
		$plan->pdf_name = $pdf_name;
	}
	 
	// create the product
	if($plan->update()){
	    echo "Schedule was updated.";
	}
 
// if unable to create the product, tell the user
else{
    echo "Unable to update schedule.";
}
// set product property values

?>