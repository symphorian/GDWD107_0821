<?php
	
	foreach ($_FILES["images"]["error"] as $key => $error) {
	    if ($error == UPLOAD_ERR_OK) {
	    	$uploaddir = 'uploads/';
			$uploadfile = $uploaddir . basename($_FILES["images"]["name"][$key]);
	        

	        if (move_uploaded_file($_FILES["images"]["tmp_name"][$key], $uploadfile)) {
				echo "Valid file successfully uploaded to " . $uploadfile . " <br/>";
			}
			else {
				echo "Bad file move <br/>";
			}
		}
		else {
			echo "Bad file load <br/>";
		}
	}

?>