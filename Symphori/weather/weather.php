<?php
	ini_set("zlib.output_compression", "Off");
	header("Content-type: text/xml");
	header('Expires: 0');
	header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
	header('Pragma: no-cache');
	
	$weather = $_GET["weather"];
	
	$url = "http://www.google.com/ig/api?weather=".urlencode($weather);
	$file = "_weather_".str_replace( array(","," "), "_", $weather).".xml";
	
	ob_clean();
	flush();
	
	// check if a local file less than an hour old is already on file
	if (!file_exists($file) || filemtime($file) < time() - 3600 || filesize($file) == 0)
	{
	ob_start();
	readfile($url);
	$google_xml = ob_get_clean();
	
	echo $google_xml;
	
	// save local copy of xml
	$handle = fopen($file,w);
	fwrite($handle, $google_xml);
	fclose($handle);
	} else
	{
	// load local copy of xml
	ob_start();
	readfile($file);
	$google_xml = ob_get_clean();
	echo $google_xml;
	}

?>