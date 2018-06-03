<?php


include ('db_conx.php');

if(isset($_POST['bio']) && isset($_POST['username']))
{
	$bio =		mysqli_real_escape_string($db_conx,$_POST['bio']);
	$username = mysqli_real_escape_string($db_conx,$_POST['username']);

	$sql   = "UPDATE users set bio = '$bio' where username ='$username'  ";
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