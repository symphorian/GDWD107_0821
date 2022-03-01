<?php
	$name = $_POST['name'];
	$email = $_POST['email'];
	$feedback = $_POST['feedback'];
	
	$toaddress = "avaricSymphorian@gmail.com";
	
	$subject = "Feedback from fake site!";
	
	$mailcontent = "Customer name: ".$name."\n".
				   "Customer email: ".$email."\n".
				   "Customer comments:\n".$feedback."\n";
				   
	$fromaddress = "From: ryan@symphori.com";
	
	mail($toaddress, $subject, $mailcontent, $fromaddress);
	
?>

<html>
<head>
<title>Bob's Auto Parts - Feedack Submitted</title>
</head>

<body>
<h1>Feedback submitted</h1>
<p>Your feedback has been sent.</p>
</body>
</html>