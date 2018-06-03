<?php
include('db_conx.php');

if(isset($_POST['id_token']))
{
	$username=  $_POST['u'];
	$imageuri = $_POST['img'];
	$email = $_POST['e'];
	$id_token =$_POST['id_token'];
	$password = md5($username);
	$name = $_POST['n'];
	$mobile = 0000;
	$g = "m";
	$c ="India";
	$website ="Google";
	$ip = preg_replace('#[^0-9.]#', '', getenv('REMOTE_ADDR'));

	$check_ifexists = "select * from users where username ='$username' AND email = '$email' ";

	$query = mysqli_query($db_conx,$check_ifexists);

	$rows = mysqli_num_rows($query);

	if($rows==0)
	{
		$insert = "INSERT INTO users (username, email, password, gender, website, country, avatar, ip, signup, lastlogin, notescheck,mobile_number,name)       
		        VALUES('$username','$email','$password','$g','$website','$c','$imageuri','$ip',now(),now(),now(),'$mobile','$name')";
		$db_update = mysqli_query($db_conx, $insert);
		
		echo "registered";
		
	}else {
		echo "exists";
	}

}








?>