<?php include('db_conx.php'); 


$article_id = $_POST['article'];
$username = $_POST['username'];

if(isset($_POST['article']))
{
	
	$check_ifexists ="SELECT * FROM like_check where user_name='$username' AND article_id='$article_id'";
	$querycheck = mysqli_query($db_conx,$check_ifexists);
	$execute_query = mysqli_num_rows($querycheck);
	
	if($execute_query == 0)
	{
		$insert ="insert into like_check (article_id, user_name, like_status) VALUES ('$article_id','$username','Y')";
		$insertquery = mysqli_query($db_conx,$insert);
		$getlikes = "select * from articles where article_id='$article_id' ";
		$query = mysqli_query($db_conx,$getlikes);
		$row =mysqli_fetch_row($query);

		$likes = $row['2'];
		$likes += 1;

		$likes_update = "UPDATE articles set likes = '$likes' where article_id='$article_id'" ;
		$update = mysqli_query($db_conx,$likes_update);
		
		if($update==true){
	
			echo $likes;}

			else

			{echo "false";}

	}else 
	{ 
		$check_like_status = "SELECT * from like_check where article_id='$article_id' AND user_name = '$username'";
		$query = mysqli_query($db_conx,$check_like_status);
		$row = mysqli_fetch_row($query);
		$like_status = $row['3'];
		if($like_status == "Y")
		{
		$getlikes = "select * from articles where article_id='$article_id' ";
		$query = mysqli_query($db_conx,$getlikes);
		$row =mysqli_fetch_row($query);
		$likes = $row['2'];
		$likes -= 1;
		$likes_update = "UPDATE articles set likes = '$likes' where article_id='$article_id' ";
		$update = mysqli_query($db_conx,$likes_update);
		$update_like_status= "UPDATE like_check set like_status = 'N' where user_name='$username' AND article_id='$article_id'" ;
		$querylikestatusupdate = mysqli_query($db_conx,$update_like_status);
		
		if($update)
		{echo $likes;}else{echo "Something Wrong";}

		}
		else
		{
		$getlikes = "select * from articles where article_id='$article_id' ";
		$query = mysqli_query($db_conx,$getlikes);
		$row =mysqli_fetch_row($query);

		$likes = $row['2'];
		$likes += 1;
		$likes_update = "UPDATE articles set likes = '$likes' where article_id='$article_id'" ;
		$update = mysqli_query($db_conx,$likes_update);
		$update_like_status= "UPDATE like_check set like_status = 'Y' where user_name='$username' AND article_id='$article_id' ";
		$querylikestatusupdate = mysqli_query($db_conx,$update_like_status);
		if($update)
		{echo $likes;}else{echo "Something Wrong";}

		exit();
		}

	}
}




?>
