<?php
if ( !empty( $_FILES ) ) {
	$news_id = 0;
	if($image->create()){
		$tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
	    $uploadPath = '/assets/img/news/covers/' . $news_id.'.jpg';

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

?>