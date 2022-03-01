<HTML>

<head> 
<script language="javascript" type="text/javascript">
        function limitText(limitField, limitNum) {
            if (limitField.value.length > limitNum) {
                limitField.value = limitField.value.substring(0, limitNum);
            } 
        }
        </script>
<style type="text/css">
<!--
#main_container {
	background-color: #003;
	width: 800px;
	margin-right: auto;
	margin-left: auto;
	position: relative;
}
-->
</style>
	</head>
    
    <body>
    
    	
        
        <FORM ACTION="unredo-addUndo.php" METHOD="POST">
        
        <p>Which action would you like to UNDO?
        <br/>
        <textarea name="do_field" cols="40" rows="5" onKeyDown="limitText(this.form.do_field,250);" onKeyUp="limitText(this.form.do_field,250);"></textarea>    
        </p>
         
        <input type="submit" name="submit_button" value="UNDO" />
        
        </form>

        <?   
        $connection = mysql_connect('localhost', 'atpda_rcr472', 'fort!contrast');
        mysql_select_db('atpda_rcr472') or die('Could not select database');
     
        // let me know if the connection fails
        if (!$connection) {
            print("Connection Failed.");
            exit;
          }
     
       // declare my query and execute
        $query = 'SELECT do FROM sample ORDER BY id DESC';
        $result = mysql_query($query) or die('Query failed: ' . mysql_error());
        ?>
        

        
        <?
        while ($line = mysql_fetch_array($result, MYSQL_ASSOC)) {
    
            foreach ($line as $col_value) {
				?>
                <div>
                <?
                echo " $col_value ";
				?>
                </div>
                <?
            }
        }
        ?>
        

        
        <?
        // Free resultset
        mysql_free_result($result);
    
        // Closing connection
        mysql_close($connection);
        ?>
        
</body>
	
   	
</HTML>