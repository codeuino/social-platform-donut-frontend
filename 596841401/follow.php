<?php
include ('db_conx.php');

if(isset($_POST['owner']))
{
	$owner = $_POST['owner'];
	$tofollow = $_POST['tofollow'];
	$follower = $_POST['follower'];


	if($owner=="no"){

	$check_ifexists = "SELECT  user_name, follower_name from followers where user_name ='$tofollow' and follower_name='$follower'  ";
	$run_query = mysqli_query($db_conx,$check_ifexists);
	$result_set = mysqli_num_rows($run_query);

	if($result_set==0){ 

	$insert = "INSERT into followers (user_name , follower_name, datemade) VALUES ('$tofollow', '$follower', now())";

	$query = mysqli_query($db_conx,$insert);

	$fetch_followers ="select followers from users where username = '$tofollow' ";

	$fetch_query= mysqli_query($db_conx,$fetch_followers);

	$row = mysqli_fetch_row($fetch_query);

	$followers =$row[0];

	$followers  += 1;

	$update_followers = "update users set followers ='$followers' where username ='$tofollow' ";

	$update_query = mysqli_query($db_conx,$update_followers);

	echo $followers;

	}

	else

	{

		$delete = "DELETE from followers where user_name ='$tofollow' and follower_name = '$follower' ";

		$ex_query = mysqli_query($db_conx,$delete);

		$fetch_followers ="select followers from users where username = '$tofollow' ";

		$fetch_query= mysqli_query($db_conx,$fetch_followers);

		$row = mysqli_fetch_row($fetch_query);

		$followers =$row[0];

		$followers  -= 1;

		$update_followers = "update users set followers ='$followers' where username ='$tofollow' ";

		$update_query = mysqli_query($db_conx,$update_followers);

		echo $followers;

	}

	

	


	}
 

 }


?>