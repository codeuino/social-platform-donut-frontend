<?php
include ('db_conx.php');

if(isset($_POST['name']) && isset($_POST['username']))
{
	$name =		mysqli_real_escape_string($db_conx,$_POST['name']);
	$username = mysqli_real_escape_string($db_conx,$_POST['username']);

	$sql   = "UPDATE users set name = '$name' where username ='$username'  ";
	$query = mysqli_query($db_conx,$sql);

	
	if($query)
	{
		echo "Successfully Updated";
	}
	else{
		echo "There was a problem";
	}


}


if(isset($_POST['mobile']) && isset($_POST['username']))
{
	$mobile  =mysqli_real_escape_string($db_conx,$_POST['mobile']);
	$username = mysqli_real_escape_string($db_conx,$_POST['username']);

	$sql   = "UPDATE users set mobile_number = '$mobile' where username ='$username'  ";
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