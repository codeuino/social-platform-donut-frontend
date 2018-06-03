<?php


include ('db_conx.php');

if(isset($_POST['livesin']) && isset($_POST['username']))
{
	$livesin =		mysqli_real_escape_string($db_conx,$_POST['livesin']);
	$username = mysqli_real_escape_string($db_conx,$_POST['username']);

	$sql   = "UPDATE users set lives_in = '$livesin' where username ='$username'  ";
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