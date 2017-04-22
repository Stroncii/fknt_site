<?php
$data = json_decode(file_get_contents("php://input"),true);  
unlink('/assets/img/news/covers/'.$data['news_id'].'_full.jpg');

?>