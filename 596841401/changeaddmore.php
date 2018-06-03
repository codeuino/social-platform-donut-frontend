<?php


include ('db_conx.php');

if(isset($_POST['addmore']) && isset($_POST['username']))
{
	$addmore =		mysqli_real_escape_string($db_conx,$_POST['addmore']);
	$username = mysqli_real_escape_string($db_conx,$_POST['username']);

	$sql   = "UPDATE users set add_more = '$addmore' where username ='$username'  ";
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