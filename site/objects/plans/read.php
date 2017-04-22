<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
//header("Cache-control: public");
//header("Expires: " . gmdate("D, d M Y H:i:s", time() + 14*60*60*24) . " GMT"); 
// include database and object files
include_once '../../config/database.php';
include_once 'plan.php';
include_once '../departments/department.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// initialize object
$plan = new Plan($db);
$department = new Department($db);
// query products
$deps = $department->read();
//$dep = $deps->fetch(PDO::FETCH_ASSOC);
//$stmt = $plan->read();
$num = $deps->rowCount();
$stmt = $plan->read();
$p_num = $stmt->rowCount();
if($p_num>0){
    $plan_info = [];
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        array_push($plan_info,$row);
    }
}
$data="";
 
// check if more than 0 record found
if($num>0){
 
     
    $x=1;
 
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $deps->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
        //$dep_data = 
        $data .= '{ "tabname":{';
        $data .= '"uk":"'.$row['name_uk'].'",';
        $data .= '"ru":"'.$row['name_ru'].'",';
        $data .= '"en":"'.$row['name_en'].'"';
        $data .= '},';
        $data .= '"pills":[';
        $y=1;
        $first = true;
        foreach ($plan_info as $pi) {
            if ($pi['department_id']==$row['id']) {
                $data .= !$first ? ',' : '';
                $data .= '{';
                $data .= '"group_title":"'  . $pi['group_title'] . '",';
                $data .= '"pdf_url":"'   . $pi['pdf_url'] . '"';
                $data .= '}';
                $first = false;
            }
            $y++;
        }

        $data .= ']}';
        /*$data .= '{';
            $data .= '"group_title":"'  . $row['group_title'] . '",';
            $data .= '"pdf_url":"'   . $row['pdf_url'] . '",';
            $data .= '"department_id":"'   . $row['department_id'] . '"';
        $data .= '}';*/
 
        $data .= $x<$num ? ',' : '';
 
        $x++;
    }
}
 
// json format output
echo '[' . $data . ']';
?>