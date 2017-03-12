<?php
// include database and object file
include_once '/config/database.php';
include_once '/news/news.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// instantiate product object
$news = new News($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
 
// set product property values
$news->title_uk = $data['title_uk'];
$news->title_ru = $data['title_ru'];
$news->title_en = $data['title_en'];
$news->full_text_uk = $data['full_text_uk'];
$news->full_text_ru = $data['full_text_ru'];
$news->full_text_en = $data['full_text_en'];
$news->short_text_uk = $data['short_text_uk'];
$news->short_text_ru = $data['short_text_ru'];
$news->short_text_en = $data['short_text_en'];
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