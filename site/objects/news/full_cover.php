<?php


$data = json_decode(file_get_contents("php://input"),true);     
// set ID property of product to be edited
if(isset($data['id'])){
	$news_id = $data['id'];
	$strr = 'set.';
}


if ( !empty( $_FILES ) ) {
	if(!isset($news_id)){
		$news_id = 0;
		$strr = 'not set.';
	}
	
	$tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
	$uploadPath = '/assets/img/news/covers/' . $news_id.'_full.jpg';

	move_uploaded_file( $tempPath, $uploadPath );

	echo "Image was uploaded and news id was ".$strr;
	
	 
	// if unable to create the product, tell the user
	else{
	    echo "Unable to upload image.";
	}
    

} else {

    echo 'No files uploaded';

}

?>