<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>UN/RE_DO</title>

<script language="javascript" type="text/javascript">
        function limitText(limitField, limitNum) {
            if (limitField.value.length > limitNum) {
                limitField.value = limitField.value.substring(0, limitNum);
            } 
        }
</script>

<style type="text/css">
<!--
-->
</style>
<link href="unredo_styles.css" rel="stylesheet" type="text/css" />
</head>

<body class="background">
	
	<?
	// process any additions (if there is data coming to this script from a form)
	
	if($_POST) {
		$doToAdd = $_POST["undo_field"];
		
		if (strlen($doToAdd) > 3) {
			$doType = "UNDO";
			
			$connection = mysql_connect('localhost', 'atpda_rcr472', 'fort!contrast');
			mysql_select_db('atpda_rcr472') or die('Could not select database');
			
			$query = "INSERT INTO sample (type,do) VALUES ('$doType','$doToAdd')";
			
			// perform command and see if it fails
			if (!mysql_query($query, $connection)) {
				print("Couldn't add item");
				exit;
			}
			
			// Closing connection
			mysql_close($connection);
		}
	
	}
	
	?>

<div class="main_container">
      <div class="header">UN/RE_DO</div>
  <div class="description">You have been given the opportunity to UNDO or REDO any past action from your life.<br/>What will you do?</div>
  <table width="750" border="0" class="UN_RE_Table">
  <tr>
    <td>
    	<div class="UNDO_header">UNDO</div>
    	<div class="UNDO_subheader">What would you UNDO? (200 char max)</div>
        
   	    <div id="UNDO_submit">
        	<FORM ACTION="unredo-addUndo.php" METHOD="POST">
        	  <textarea name="undo_field" cols="28" rows="7" onkeydown="limitText(this.form.undo_field,200);" onkeyup="limitText(this.form.undo_field,200);"></textarea>
        	  <input name="submit_button" type="image" value="UNDO" src="UNDObutton.png" />
            
          </form>
        </div>
    </td>
    <td>
    	<div class="REDO_header">REDO</div>
    	<div class="REDO_subheader">What would you REDO? (200 char max)</div>
        
          <div id="REDO_submit">
            <FORM ACTION="unredo-addRedo.php" METHOD="POST">
             <input type="image" src="REDObutton.png" name="submit_button" value="REDO" />
             <textarea name="redo_field" cols="28" rows="7" onkeydown="limitText(this.form.redo_field,200);" onkeyup="limitText(this.form.redo_field,250);"></textarea>
             
             
             
            </form>
        </div>
      </td>
  </tr>
  <tr>
  	  <td valign="top">
      	 <div class="UNDO_header">UNDONE</div>
        <div id="UNDO_content">
        	 <?   
				$connection = mysql_connect('localhost', 'atpda_rcr472', 'fort!contrast');
				mysql_select_db('atpda_rcr472') or die('Could not select database');
			 
				// let me know if the connection fails
				if (!$connection) {
					print("Connection Failed.");
					exit;
				  }
			 
			   // declare my query and execute
				$query = 'SELECT do FROM sample WHERE type=\'UNDO\' ORDER BY id DESC';
				$result = mysql_query($query) or die('Query failed: ' . mysql_error());
		
				while ($line = mysql_fetch_array($result, MYSQL_ASSOC)) {
			
					foreach ($line as $col_value) {
						?>
<div class="UNDO_post">
							<div class="UNDO_text">
						<?
						echo " $col_value ";
						?>
			  </div>
		  </div>
						<?
					}
				}
		
				// Free resultset
				mysql_free_result($result);
			
				// Closing connection
				mysql_close($connection);
			?>
            
        </div>
     </td>
     <td valign="top">
     	<div class="REDO_header">REDONE</div>
        <div id="REDO_content">
          <?   
				$connection = mysql_connect('localhost', 'atpda_rcr472', 'fort!contrast');
				mysql_select_db('atpda_rcr472') or die('Could not select database');
			 
				// let me know if the connection fails
				if (!$connection) {
					print("Connection Failed.");
					exit;
				  }
			 
			   // declare my query and execute
				$query = 'SELECT do FROM sample WHERE type=\'REDO\' ORDER BY id DESC';
				$result = mysql_query($query) or die('Query failed: ' . mysql_error());
		
				while ($line = mysql_fetch_array($result, MYSQL_ASSOC)) {
			
					foreach ($line as $col_value) {
						?>
		  				<div class="REDO_post">
							<div class="REDO_text">
						<?
						echo " $col_value ";
						?>
							</div>
		  				</div>
						<?
					}
				}
		
				// Free resultset
				mysql_free_result($result);
			
				// Closing connection
				mysql_close($connection);
			?>
      </div>
    </td>
  </tr>
</table>

</div>

</body>
</html>