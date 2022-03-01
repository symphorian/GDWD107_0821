<?php
	$uploaddir = 'uploads/';
	$uploadfile = $uploaddir . basename($_FILES['imgfile']['name']);

	if (move_uploaded_file($_FILES['imgfile']['tmp_name'], $uploadfile)) {
		echo "Valid file successfully uploaded <br/>";
	}
	else {
		echo "Bad file <br/>";
	}

	echo "Debugging info <br/>";
	print_r($_FILES);
?>