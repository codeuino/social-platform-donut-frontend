<?php


include ('db_conx.php');

if(isset($_POST['worksat']) && isset($_POST['username']))
{
	$worksat =		mysqli_real_escape_string($db_conx,$_POST['worksat']);
	$username = mysqli_real_escape_string($db_conx,$_POST['username']);

	$sql   = "UPDATE users set works_at = '$worksat' where username ='$username'  ";
	$query = mysqli_query($db_conx,$sql);

	
	if($query)
	{
		echo "Successfully Updated";
	}
	else{
		echo "There was a problem";
	}


}


?>