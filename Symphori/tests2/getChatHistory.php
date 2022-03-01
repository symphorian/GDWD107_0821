<?php

//set_time_limit(0);
//header( 'Content-type: text/html; charset=utf-8' );

$userID = $_REQUEST["userID"];
$conversationID = $_REQUEST["conversationID"];

$last_query_date = date('Y-m-d H:i:s',mktime(0,0,0,1,1,2000));

$mysqli = new mysqli('localhost','symphor1_admin','&Ydindri1','symphor1_main');

if ($mysqli->connect_error) {
	die("$mysqli->connect_errno: $mysqli->connect_error");
}

// while(true) {
// 	if (connection_aborted()) {
// 		break;
// 	}
// 	else {
// 		ob_start();


		if ($stmt = $mysqli->prepare("SELECT 
										U.UserID,
										U.Name,
									    M.Content,
									    M.CreateDate
									FROM Message M
									INNER JOIN User U ON U.UserID = M.UserID
									WHERE M.ConversationID = ? AND M.CreateDate > ?
									ORDER BY M.CreateDate ASC")) {

			$stmt->bind_param("is", $conversationID, $last_query_date);

			$stmt->execute();
			$stmt->store_result();

			$num_rows = $stmt->num_rows;

			if ($num_rows > 0) {
				$stmt->bind_result($result_userID, $result_name, $result_content, $last_query_date);

				while($stmt->fetch()) {
					if ($result_userID == $userID) {
						echo str_pad("1" . "|" . $result_name . "|" . $result_content,4096) . "\n";
					}
					else {
						echo str_pad("2" . "|" . $result_name . "|" . $result_content,4096) . "\n";
					}  
					$lastQueryDate = $last_query_date;
				}
			}

			$stmt->free_result();
			$stmt->close();
		}

// 		ob_flush();
//     	flush();

//     	ob_end_clean();

//     	sleep(1);
// 	}

// }

$mysqli->close();



?>