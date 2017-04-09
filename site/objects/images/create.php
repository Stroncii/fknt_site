<?php
// include database and object file
include_once '../../config/database.php';
include_once 'image.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// instantiate product object
$image = new Image($db);
 
if ( !empty( $_FILES ) ) {
	if($image->create()){
		$tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
	    $uploadPath = '/assets/img/news/items/' . $image->id.'.jpg';

	    move_uploaded_file( $tempPath, $uploadPath );

	    echo "Image was created.";
	}
	 
	// if unable to create the product, tell the user
	else{
	    echo "Unable to create image.";
	}
    

} else {

    echo 'No files uploaded';

}
// get posted data
/*$data = json_decode(file_get_contents("php://input"),true);
 
// set product property values
$user->username = $data['username'];
$user->email = $data['email'];
$user->level = $data['level'];
$user->password = md5($data['password']);
 
// create the product
if($user->create()){
    echo "User was created.";
}
 
// if unable to create the product, tell the user
else{
    echo "Unable to create user.";
}*/
?>