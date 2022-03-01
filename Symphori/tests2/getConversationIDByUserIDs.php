<?php
	$userID1 = $_REQUEST["userID1"];
	$userID2 = $_REQUEST["userID2"];

	$mysqli = new mysqli('localhost','symphor1_admin','&Ydindri1','symphor1_main');

	if ($mysqli->connect_error) {
		die("$mysqli->connect_errno: $mysqli->connect_error");
	}

	if ($stmt = $mysqli->prepare("SELECT C.ConversationID, C.CreateDate
									FROM Conversation C 
									INNER JOIN 
									(
										SELECT ConversationID
										FROM UserConversation 
										WHERE UserID in (?,?)
										GROUP BY ConversationID
										HAVING COUNT(1) = 2
									) C1 ON C1.ConversationID = C.ConversationID
									INNER JOIN 
									(
										SELECT ConversationID
										FROM UserConversation
										GROUP BY ConversationID
										HAVING COUNT(1) = 2
									) C2 ON C2.ConversationID = C.ConversationID
									WHERE C.DeleteDate is null
									ORDER BY C.CreateDate DESC
									LIMIT 1")) {
		$stmt->bind_param("ii", $userID1, $userID2);

		$stmt->execute();
		$stmt->store_result();

		$num_rows = $stmt->num_rows;

		if ($num_rows == 1) {
			$stmt->bind_result($result_conversationID,$result_create_date);

			while($stmt->fetch()) {
				echo "SUCCESS," . $result_conversationID . "," . $result_create_date . "," . date('Y-m-d H:i:s');
			}
		}
		else {
			echo "FAILURE,0,0,0";
		}

		$stmt->free_result();
		$stmt->close();
	}
	else {
		echo "FAILURE,0,0,0";
	}

	$mysqli->close();



	//$connection = mysqli_connect('localhost', 'root', 'aydindril');

	// if (!$connection) {
	// 	die('Could not connect to the mysql server: ' . mysqli_error($connection));
	// }

	// if (mysqli_select_db($connection, 'test')) {

	// 	$test_query = "select C.ConversationID, C.CreateDate
	// 					from Conversation C 
	// 					inner join 
	// 					(
	// 						select ConversationID
	// 						from UserConversation 
	// 						where UserID in (" . $userID1 . ", " . $userID2 . ")
	// 						group by ConversationID
	// 					) C1 on C1.ConversationID = C.ConversationID
	// 					inner join 
	// 					(
	// 						select ConversationID
	// 						from UserConversation
	// 						group by ConversationID
	// 						having COUNT(1) = 2
	// 					) C2 on C2.ConversationID = C.ConversationID
	// 					where C.DeleteDate is null
	// 					order by C.CreateDate desc
	// 					limit 1";

	// 	$test_result = mysqli_query($connection, $test_query);

	// 	$test_num_rows = mysqli_num_rows($test_result);

	// 	if ($test_num_rows == 1) {
	// 		while($row = mysqli_fetch_assoc($test_result)){
	// 		    echo "SUCCESS," . $row['ConversationID'] . "," . $row['CreateDate'] . "," . date('Y-m-d H:i:s');
	// 		}
	// 	}
	// 	else {
	// 		echo "FAILURE,0";
	// 	}

	// 	mysqli_free_result($test_result);

	// 	// echo "<br /><br />";

	// 	// $test_query = "SELECT * FROM User";
	// 	// $test_result = mysqli_query($connection, $test_query);

	// 	// echo 
	// 	// while($row = mysqli_fetch_assoc($test_result)){
	// 	//     echo "Username:" . $row['Username'] . ", Password:" . $row["Password"] . '<br />';
	// 	// }


		
	// 	// mysqli_free_result($test_result);
	// }
	// else {
	// 	echo mysqli_error($connection);
	// }

	// mysqli_close($connection);
?>