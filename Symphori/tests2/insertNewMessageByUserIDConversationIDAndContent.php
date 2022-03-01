<?php
	echo "Reached php file";

	$userID = $_REQUEST["userID"];
	$conversationID = $_REQUEST["conversationID"];
	$content = $_REQUEST["content"];

	$mysqli = new mysqli('localhost','symphor1_admin','&Ydindri1','symphor1_main');

	if ($mysqli->connect_error) {
		die("$mysqli->connect_errno: $mysqli->connect_error");
	}

	$date = date('Y-m-d H:i:s');

	if ($stmt = $mysqli->prepare("INSERT INTO Message (UserID, ConversationID, Content, CreateDate) VALUES (?,?,?,?)")) {
		
		$stmt->bind_param("iiss", $userID, $conversationID, $content, $date);

		$stmt->execute();

		$num_rows = $stmt->affected_rows;

		if ($num_rows == 1) {
			echo "Insert statement succeeded: affected " . $num_rows . " rows.";
		}
		else {
			echo "Insert statement failed: " . $mysqli->error;
		}

		$stmt->free_result();
		$stmt->close();
	}

	$mysqli->close();

	//$connection = mysqli_connect('localhost', 'root', 'aydindril');

	// if (!$connection) {
	// 	die('Could not connect to the mysql server: ' . mysqli_error($connection));
	// }

	// if (mysqli_select_db($connection, 'test')) {


	// 	$insert_query = "INSERT INTO Message (UserID,ConversationID,Content,CreateDate) VALUES ('" . $userID . "','" . $conversationID . "','" . $content . "','" . date('Y-m-d H:i:s') . "')";
	// 	$insert_result = mysqli_query($connection, $insert_query);
	// 	if ($insert_result) {
	// 		echo "Insert statement '" . $insert_query . "' succeeded: affected " . mysqli_affected_rows($connection) . " rows";
	// 	}
	// 	else {
	// 		echo "Insert statement '" . $insert_query . "' failed: " . mysqli_error($connection);
	// 	}

	// 	//mysqli_free_result($insert_result);
	// }
	// else {
	// 	echo mysqli_error($connection);
	// }

	// mysqli_close($connection);
?>