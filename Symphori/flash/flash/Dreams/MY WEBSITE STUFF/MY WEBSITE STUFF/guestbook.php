<HTML>

	List of all users that have signed the guest book:
	

	<?   
	
	$connection = mysql_connect('localhost', 'atpda_rcr472', 'fort!contrast');
	mysql_select_db('atpda_rcr472') or die('Could not select database');
 
   	// let me know if the connection fails
   	if (!$connection) {
 		print("Connection Failed.");
 		exit;
 	  }
 
   // declare my query and execute
   	$query = 'SELECT * FROM sample';
   	$result = mysql_query($query) or die('Query failed: ' . mysql_error());
   	
   	?>
   	
   	<PRE>
   	
   	<?
	while ($line = mysql_fetch_array($result, MYSQL_ASSOC)) {

    	foreach ($line as $col_value) {
        	echo " $col_value ";
    	}
    	echo "\n";
	}


	?>
	
	</PRE>
	
	<?
	

	// Free resultset
	mysql_free_result($result);

	// Closing connection
	mysql_close($connection);
	?>
	
	
	
	<FORM ACTION="guestbook-add.php" METHOD="POST">
	
	<p>Sign the book</p>
	
	<p>
	
	Your first name: <input type="text" size="40" name="firstname_field" /> <br/>
	Your last name: <input type="text" size="40" name="lastname_field" />
	</p>
	
	<input type="submit" name="submit_button" />
	
	</form>
	
	
   	
</HTML>