<?php 
// include database and object files 
include_once '../../config/database.php';
include_once 'plan.php';
 
// get database connection 
$database = new Database(); 
$db = $database->getConnection();
 
// prepare product object
$plan = new Plan($db);
 
// get id of product to be edited
$data = json_decode(file_get_contents("php://input"),true);   
//$data = [12,13,11,2,3,1,4,5,6,7,8,9,10];
// set ID property of product to be edited
if(count($data)!=0){
	$pos = range(1,count($data));
	$j = 0;
	$cond = false;
	foreach ($data as $v) {
		$plan->id = $v;
		$plan->sort_order = $pos[$j];
		if($plan->updatePosition()){
			$cond = true;
		    
		}
		$j++;
	}
	if($cond){
		echo "Positions were updated." ;
	}
	else{
		echo "Unable to update positions.";
	}

}
else{
	echo "Unable to update positions. Data was not received";
}
?>