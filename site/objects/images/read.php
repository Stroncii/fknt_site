<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Cache-control: public");
header("Expires: " . gmdate("D, d M Y H:i:s", time() + 14*60*60*24) . " GMT"); 
// include database and object files
include_once '../../config/database.php';
include_once 'image.php';


// instantiate database and product object
$database = new Database();
$db = $database->getConnection();
$id = htmlspecialchars(strip_tags($_GET['id'])); 
// initialize object
$image = new Image($db);
// query products
$stmt = $image->read($id);
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
            $data .= '"path":"/assets/img/news/items/'  . $row['id'] . '.jpg",';
            $data .= '"news_id":"'   . $row['news_id'] . '"';
        $data .= '}';
 
        $data .= $x<$num ? ',' : '';
 
        $x++;
    }
}
 
// json format output
echo '{"images":[' . $data . ']}';
?>