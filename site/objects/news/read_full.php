<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../../config/database.php';
include_once 'news.php';
 
// instantiate database and product object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$news = new News($db);

$id = htmlspecialchars(strip_tags($_GET['id']));  

// query products 
$stmt = $news->readAllLang($id);
$num = $stmt->rowCount();
 
$data="";
$langs = array("uk","ru","en");
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
            $l = 1;
            foreach ($langs as $lang) {
                $data .= '"'.$lang.'":';
                $lang_info = "{";
                $lang_info .= '"title":"'   . $row['title_'.$lang] . '",';
                $lang_info .= '"synopsis":"'   . $row['short_text_'.$lang] . '",';
                $lang_info .= '"content":"' . $row['full_text_'.$lang] . '"}';
                $data .= $lang_info;
                $data .= $l<count($langs) ? ',' : '';
                $l++;
            }
        $data .= '}';
    }
}
 
// json format output
echo $data;


?>