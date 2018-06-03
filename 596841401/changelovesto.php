<?php


include ('db_conx.php');

if(isset($_POST['lovesto']) && isset($_POST['username']))
{
	$lovesto =		mysqli_real_escape_string($db_conx,$_POST['lovesto']);
	$username = mysqli_real_escape_string($db_conx,$_POST['username']);

	$sql   = "UPDATE users set loves_to = '$lovesto' where username ='$username'  ";
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