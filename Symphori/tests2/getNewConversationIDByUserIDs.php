<?php
	$userID1 = $_REQUEST["userID1"];
	$userID2 = $_REQUEST["userID2"];

	$conversation_creation_succeeded = FALSE;
	$new_conversationID = 0;
	$user_conversation_creation_succeeded = FALSE;

	$mysqli = new mysqli('localhost','symphor1_admin','&Ydindri1','symphor1_main');

	if ($mysqli->connect_error) {
		die("$mysqli->connect_errno: $mysqli->connect_error");
	}

	$date = date('Y-m-d H:i:s');

	if ($stmt = $mysqli->prepare("INSERT INTO Conversation (CreateDate) VALUES (?)")) {
		
		$stmt->bind_param("s", $date);

		$stmt->execute();

		$num_rows = $stmt->affected_rows;

		if ($num_rows == 1) {
			$conversation_creation_succeeded = TRUE;
		}

		$stmt->free_result();
		$stmt->close();
	}

	if ($conversation_creation_succeeded) {
		if ($stmt = $mysqli->prepare("SELECT ConversationID FROM Conversation WHERE CreateDate = ?")) {
			$stmt->bind_param("s", $date);

			$stmt->execute();
			$stmt->store_result();

			$num_rows = $stmt->num_rows;

			if ($num_rows == 1) {
				$stmt->bind_result($new_conversationID);

				while($stmt->fetch()) {
					// $new_conversationID is set by calling fetch
				}
			}

			$stmt->free_result();
			$stmt->close();
		}
	}

	if ($new_conversationID != 0) {
		if ($stmt = $mysqli->prepare("INSERT INTO UserConversation (UserID, ConversationID, LastViewDate) VALUES (?,?,?), (?,?,?)")) {
			$stmt->bind_param("iisiis", $userID1, $new_conversationID, $date, $userID2, $new_conversationID, $date);

			$stmt->execute();

			$num_rows = $stmt->affected_rows;

			if ($num_rows == 2) {
				$user_conversation_creation_succeeded = TRUE;
			}

			$stmt->free_result();
			$stmt->close();
		}
	}

	if ($conversation_creation_succeeded && $new_conversationID != 0 && $user_conversation_creation_succeeded) {
		echo "SUCCESS," . $new_conversationID;
	}
	else {
		echo "FAILURE,0";
	}


	$mysqli->close();

	//$connection = mysqli_connect('localhost', 'root', 'aydindril');

	// if (!$connection) {
	// 	die('Could not connect to the mysql server: ' . mysqli_error($connection));
	// }

	// if (mysqli_select_db($connection, 'test')) {
	// 	$date = date('Y-m-d H:i:s');
	// 	$test_query = "insert into Conversation (CreateDate) values ('" . $date . "')";
	// 	$test_result = mysqli_query($connection, $test_query);

	// 	if ($test_result) {
	// 		//mysqli_free_result($test_result);

	// 		$test_query = "select ConversationID from Conversation order by CreateDate desc limit 1";
	// 		$test_result = mysqli_query($connection, $test_query);
	// 		$test_num_rows = mysqli_num_rows($test_result);

	// 		if ($test_num_rows == 1) {
	// 			while($row = mysqli_fetch_assoc($test_result)){
	// 			    //echo "SUCCESS," . $row['ConversationID'] . "," . $row['CreateDate'];
	// 			    $newConversationID = $row['ConversationID'];
	// 			}
	// 		}

	// 		mysqli_free_result($test_result);

	// 		if ($newConversationID != 0) {

	// 			$test_query = "insert into UserConversation (UserID,ConversationID,LastViewDate) values (" . $userID1. "," . $newConversationID . ",'" . $date . "'), (" . $userID2. "," . $newConversationID . ",'" . $date . "')";
	// 			$test_result = mysqli_query($connection, $test_query);

	// 			if ($test_result) {
	// 				echo "SUCCESS," . $newConversationID;
	// 			}
	// 			else {
	// 				echo "FAILURE,0";
	// 			}
	// 		}
	// 	}
	// }
	// else {
	// 	echo mysqli_error($connection);
	// }

	// mysqli_close($connection);
?>