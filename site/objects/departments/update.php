<?php 
// include database and object files 
include_once '/config/database.php';
include_once '/news/news.php';
 
// get database connection 
$database = new Database(); 
$db = $database->getConnection();
 
// prepare product object
$news = new News($db);
 
// get id of product to be edited
$data = json_decode(file_get_contents("php://input"));     
 
// set ID property of product to be edited
$news->id = $data->id;
 
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
 
// update the product
if($product->update()){
    echo "News was updated.";
}
 
// if unable to update the product, tell the user
else{
    echo "Unable to update news.";
}
?>