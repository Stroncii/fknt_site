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

if(count($_POST)==0){
	$_data = json_decode(file_get_contents("php://input"),true);
	$data = $_data['formData'][0];

}
else{
	$data = $_POST;
}

if(isset($data['department_id'])){
	$plan->department_id = $data['department_id'];
}
if(isset($data['title_uk'])){
	$plan->group_title_uk = $data['title_uk'];
}
if(isset($data['title_ru'])){
	$plan->group_title_ru = $data['title_ru'];
}
if(isset($data['title_en'])){
	$plan->group_title_en = $data['title_en'];
}
if(isset($data['id'])){
	$plan->id = $data['id'];
}


$pdf_name = "";

if ( !empty( $_FILES ) ) {

	$pdf_name = $_FILES[ 'file' ][ 'name' ];
	$tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
	$uploadPath = $_SERVER['DOCUMENT_ROOT'] .'/assets/pdf/schedule/' . $pdf_name;

	move_uploaded_file( $tempPath, $uploadPath );

	echo "PDF was uploaded. ";
	$plan->pdf_name = $pdf_name;
    

} else {

    echo 'No files uploaded. ';

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