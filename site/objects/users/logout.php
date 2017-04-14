<?php 
	session_start();
   unset($_SESSION["user"]);
   
   echo 'You have logged out';

   ?>
