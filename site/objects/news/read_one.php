<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../../config/database.php';
include_once '../images/image.php';
include_once 'news.php';
 
// instantiate database and product object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$news = new News($db);
//$params = explode('/',substr($_SERVER['PHP_SELF'],strpos($_SERVER['PHP_SELF'],'read_one')+13));

// query products
$lang = htmlspecialchars(strip_tags($_GET['language']));  
$id = htmlspecialchars(strip_tags($_GET['id'])); 
$stmt = $news->readOne($lang,$id);
$num = $stmt->rowCount();
$images = new Image($db);
$imgs = $images->read($id);
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
            $i_num = $imgs->rowCount();
            while ($im = $imgs->fetch(PDO::FETCH_ASSOC)){
                $data .= '"/assets/img/news/items/' . $im['id'] . '.jpg"';
                $data .= $l<$i_num? ',' : '';
 
                $l++;
            }
            $data .= ']';
        $data .= '}';
    }
}
 
// json format output
echo $data;
?>