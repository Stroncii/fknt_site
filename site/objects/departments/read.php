<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Cache-control: public");
header("Expires: " . gmdate("D, d M Y H:i:s", time() + 14*60*60*24) . " GMT"); 
// include database and object files
include_once '../../config/database.php';
include_once 'department.php';


// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// initialize object
$deps = new Department($db);
// query products
$stmt = $deps->read();
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
            $data .= '"name_uk":"'   . $row['name_uk'] . '",';
            $data .= '"name_ru":"'   . $row['name_ru'] . '",';
            $data .= '"name_en":"'   . $row['name_en'] . '"';
        $data .= '}';
 
        $data .= $x<$num ? ',' : '';
 
        $x++;
    }
}
 
// json format output
echo '{"departments":[' . $data . ']}';
?>