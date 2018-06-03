<?php


include ('db_conx.php');

if(isset($_POST['education']) && isset($_POST['username']))
{
	$education =		mysqli_real_escape_string($db_conx,$_POST['education']);
	$username = mysqli_real_escape_string($db_conx,$_POST['username']);

	$sql   = "UPDATE users set education = '$education' where username ='$username'  ";
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