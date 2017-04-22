<?php
$data = json_decode(file_get_contents("php://input"),true);  
unlink('/assets/img/news/covers/'.$data['news_id'].'.jpg');

?>