<?php
	$name = $_REQUEST["name"];
	$password = $_REQUEST["password"];

	$connection = mysqli_connect('localhost', 'symphor1_admin', '&Ydindri1');

	if (!$connection) {
		die('Could not connect to the mysql server: ' . mysqli_error($connection));
	}

	if (mysqli_select_db($connection, 'symphor1_main')) {

		$test_query = "SELECT * FROM User WHERE Name = '" . $name . "'";

		$test_result = mysqli_query($connection, $test_query);

		$test_num_rows = mysqli_num_rows($test_result);
		
		mysqli_free_result($test_result);

		if ($test_num_rows > 0) {
			echo "User name already exists; cannot insert into database.";
		}
		else {
			$insert_query = "INSERT INTO User (Name,Password) VALUES ('" . $name . "','" . $password . "')";
			$insert_result = mysqli_query($connection, $insert_query);
			if ($insert_result) {
				echo "Insert statement '" . $insert_query . "' succeeded: affected " . mysqli_affected_rows($connection) . " rows";
			}
			else {
				echo "Insert statement '" . $insert_query . "' failed: " . mysqli_error($connection);
			}
		}
	}
	else {
		echo mysqli_error($connection);
	}

	mysqli_close($connection);
?>