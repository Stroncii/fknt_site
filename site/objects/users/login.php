<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Cache-control: public");
header("Expires: " . gmdate("D, d M Y H:i:s", time() + 14*60*60*24) . " GMT"); 
// include database and object files
include_once '../../config/database.php';
include_once 'user.php';


// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// initialize object
$user = new User($db);
// query products
$data = json_decode(file_get_contents("php://input"),true);  
$name = $data['username'];
$pass = md5($data['password']);
$stmt = $user->check($name,$pass);
$num = $stmt->rowCount();


 
// check if more than 0 record found
if($num>0){
 
     
    $x=1;
 
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    $row = $stmt->fetch(PDO::FETCH_ASSOC))
        // extract row
        // this will make $row['name'] to
        // just $name only
    extract($row);
    ob_start();
    session_start();
    $data="success";
    $_SESSION['user'] = array('id' => $row['id'], 'username' => $row['username'], 'email' => $row['email'], 'level' => $row['level']); 
}
else{
    $data="fail";
}
 
// json format output
echo '{"login":' . $data . '}';
?>