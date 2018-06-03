<?php
include('db_conx.php');

if(isset($_POST['username']))
{   
	$contentname = mysqli_real_escape_string($db_conx, $_POST['contentname']);
	$tagline   = mysqli_real_escape_string($db_conx, $_POST['tagline']);
	$content   = mysqli_real_escape_string($db_conx, $_POST['content']);
	$genre     = mysqli_real_escape_string($db_conx, $_POST['genre']);
	$username =mysqli_real_escape_string($db_conx,$_POST['username']);
	
		

	$insert = "INSERT INTO articles (user_name,likes,views,contentname,tagline,genre,content,date_added) VALUES ('$username','0','0','$contentname','$tagline','$genre','$content',now())";

	$query = mysqli_query($db_conx,$insert);

	if($query)
	{
	echo "Successfully Published";

	exit();
}
	else
		{echo "An error occured";}



}

?>