<?php
	$name = $_REQUEST["name"];
	$value = $_REQUEST["value"];

	setcookie($name,$value,time()+60*60)
?>