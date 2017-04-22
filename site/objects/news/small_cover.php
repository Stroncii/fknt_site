<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: multipart/form-data; charset=UTF-8");
    
// set ID property of product to be edited
if(isset($_POST['news_id'])){
	$news_id = $_POST['news_id'];
	$strr = 'set.';
}

if ( !empty( $_FILES ) ) {
	if(!isset($news_id)){
		$news_id = 0;
		$strr = 'not set.';
	}
	
	$tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
	$uploadPath = $_SERVER['DOCUMENT_ROOT'] .'/assets/img/news/covers/' . $news_id.'.jpg';

	move_uploaded_file( $tempPath, $uploadPath );

	echo "Image was uploaded and news id was ".$strr;
	
	
    

} else {

    echo 'No files uploaded';

}

?>