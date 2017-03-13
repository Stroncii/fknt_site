<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/database.php';
include_once 'news.php';
 
// instantiate database and product object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$news = new News($db);
$lang = 'uk';
$id = explode('/',substr($_SERVER['PHP_SELF'],strpos($_SERVER['PHP_SELF'],'read_one')+0))[0];
// query products
$stmt = $news->readOne($lang,$id);
$num = $stmt->rowCount();
 
$data="";

// check if more than 0 record found
if($num>0){
 
     
    $x=1;
 
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
        
        $data .= '{';
            $data .= '"id":"'  . $row['id'] . '",';
            $data .= '"title":"'   . $row['title_'.$lang] . '",';
            $data .= '"synopsis":"'   . $row['short_text_'.$lang] . '",';
            $data .= '"content":"' . $row['full_text_'.$lang] . '",';
            $data .= '"images":[';
            $l = 1;
            $imgs = explode(",",$row['images_nums']);
            foreach ($imgs as $value) {
                $data .= '"/assets/img/news/items/' . $row['id'] . '_'.$value.'.jpg"';
                $data .= $l<count($imgs) ? ',' : '';
 
                $l++;
            }
            $data .= ']';
        $data .= '}';
 
        $data .= $x<$num ? ',' : '';
 
        $x++;
    }
}
 
// json format output
echo '{"news":[' . $data . ']}';
?>