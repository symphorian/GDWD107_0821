<?php
	$name = $_REQUEST["name"];

	$mysqli = new mysqli('localhost','symphor1_admin','&Ydindri1','symphor1_main');

	if ($mysqli->connect_error) {
		die("$mysqli->connect_errno: $mysqli->connect_error");
	}

	if ($stmt = $mysqli->prepare("SELECT UserID FROM User WHERE Name = ?")) {
		$stmt->bind_param("s", $name);

		$stmt->execute();
		$stmt->store_result();

		$num_rows = $stmt->num_rows;

		if ($num_rows == 1) {
			$stmt->bind_result($result_userID);

			while($stmt->fetch()) {
				echo "SUCCESS," . $result_userID;
			}
		}
		else {
			echo "FAILURE,0";
		}

		$stmt->free_result();
		$stmt->close();
	}
	else {
		echo "FAILURE,0";
	}

	$mysqli->close();

?>