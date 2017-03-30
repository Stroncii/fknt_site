<?php
// include database and object file
include_once '../../config/database.php';
include_once 'news.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// instantiate product object
$news = new News($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"),true);

// set product property values
$news->title_uk = $data['uk']['title'];
$news->title_ru = $data['ru']['title'];
$news->title_en = $data['en']['title'];
$news->full_text_uk = $data['uk']['content'];
$news->full_text_ru = $data['ru']['content'];
$news->full_text_en = $data['en']['content'];
$news->short_text_uk = $data['uk']['synopsis'];
$news->short_text_ru = $data['ru']['synopsis'];
$news->short_text_en = $data['en']['synopsis'];
$news->images_nums = $data['images_nums'];
 
// create the product
if($news->create()){
    echo "News was created.";
}
 
// if unable to create the product, tell the user
else{
    echo "Unable to create news.";
}
?>