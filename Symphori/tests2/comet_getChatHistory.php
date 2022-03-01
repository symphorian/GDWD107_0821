<?php

set_time_limit(0);
header( 'Content-type: text/html; charset=utf-8' );

$userID = $_REQUEST["userID"];
$conversationID = $_REQUEST["conversationID"];

$last_query_date = date('Y-m-d H:i:s',mktime(0,0,0,1,1,2000));

$mysqli = new mysqli('localhost','symphor1_admin','&Ydindri1','symphor1_main');

if ($mysqli->connect_error) {
	die("$mysqli->connect_errno: $mysqli->connect_error");
}

while(true) {
	if (connection_aborted()) {
		break;
	}
	else {
		ob_start();


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

		ob_flush();
    	flush();

    	ob_end_clean();

    	sleep(1);
	}

}

$mysqli->close();

//$connection = mysqli_connect('localhost', 'root', 'aydindril');

// if (!$connection) {
// 	die('Could not connect to the mysql server: ' . mysqli_error($connection));
// }

// //$lastQueryDate = date('Y-m-d H:i:s');
// //$lastQueryDate = date('Y-m-d H:i:s',mktime(0,0,0,1,1,2000));

// //echo $lastQueryDate;

// if (mysqli_select_db($connection, 'test')) {

// 	// ob_start();
// 	// echo str_pad('',4096) . "\n";
// 	// ob_flush();
// 	// flush();
// 	// ob_end_clean();


// 	while(true) {
// 		if (connection_aborted()) {
// 			break;
// 		}
// 		else {
// 			ob_start();

			
// 			//echo str_pad('',4096) . "\n";
// 			// echo $lastQueryDate . "\n";

// 			$test_query = "select 
// 								U.UserID,
// 								U.Name,
// 							    M.Content,
// 							    M.CreateDate
// 							from Message M
// 							inner join User U on U.UserID = M.UserID
// 							where M.ConversationID = " . $conversationID . " and M.CreateDate > '" . $lastQueryDate . "'" .
// 							"order by M.CreateDate asc";

// 			//echo $test_query . "\n";

// 			$test_result = mysqli_query($connection, $test_query);

// 			//$lastQueryDate = date('Y-m-d H:i:s');

// 			$test_num_rows = mysqli_num_rows($test_result);

// 			if ($test_num_rows > 0) {
// 				while($row = mysqli_fetch_assoc($test_result)){
// 					if ($row["UserID"] == $userID) {
// 						//echo str_pad('',4096) . "\n";
// 						//echo str_pad("<p style='text-align:left'>" . $row['Name'] . ":" . $row["Content"] . "</p>",4096) . "\n";
// 						echo str_pad("1" . "|" . $row['Name'] . "|" . $row["Content"],4096) . "\n";
// 					}
// 					else {
// 						//echo str_pad('',4096) . "\n";
// 						//echo str_pad("<p style='text-align:right'>" . $row['Name'] . ":" . $row["Content"] . "</p>",4096) . "\n";
// 						echo str_pad("2" . "|" . $row['Name'] . "|" . $row["Content"],4096) . "\n";
// 					}  
// 					$lastQueryDate = $row["CreateDate"];
// 				}
// 			}

// 			mysqli_free_result($test_result);

// 			ob_flush();
// 	    	flush();

// 	    	ob_end_clean();

// 	    	sleep(1);
// 	    }
// 	}

// }
// else {
// 	echo mysqli_error($connection);
// }

// mysqli_close($connection);

?>