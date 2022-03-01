<?php
	$name = $_REQUEST["name"];

	setcookie($name,"",time()-3600);
?>