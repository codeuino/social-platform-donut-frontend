<?php include('db_conx.php'); 


$article_id = $_POST['articledislikes'];
$username = $_POST['username'];

if(isset($_POST['articledislikes']))
{
	
	$check_ifexists = "SELECT * FROM dislike_check where user_name='$username' AND article_id='$article_id'";
	$querycheck = mysqli_query($db_conx,$check_ifexists);
	$execute_query = mysqli_num_rows($querycheck);
	
	if($execute_query == 0)
	{
		$insert ="insert into dislike_check (article_id, user_name, dislike_status) VALUES ('$article_id','$username','Y')";
		$insertquery = mysqli_query($db_conx,$insert);
		$getdislikes = "select * from articles where article_id='$article_id' ";
		$query = mysqli_query($db_conx,$getdislikes);
		$row =mysqli_fetch_row($query);

		$dislikes = $row['9'];
		$dislikes += 1;

		$dislikes_update = "UPDATE articles set dislikes = '$dislikes' where article_id='$article_id'" ;
		$update = mysqli_query($db_conx,$dislikes_update);
		
		if($update==true){
	
			echo $dislikes;}

			else

			{echo "false";}

	}else 
	{ 
		$check_dislike_status = "SELECT * from dislike_check where article_id='$article_id' AND user_name = '$username'";
		$query = mysqli_query($db_conx,$check_dislike_status);
		$row = mysqli_fetch_row($query);
		$dislike_status = $row['3'];
		if($dislike_status == "Y")
		{
		$getdislikes = "select * from articles where article_id='$article_id' ";
		$query = mysqli_query($db_conx,$getdislikes);
		$row =mysqli_fetch_row($query);
		$dislikes = $row['9'];
		$dislikes -= 1;
		$dislikes_update = "UPDATE articles set dislikes = '$dislikes' where article_id='$article_id' ";
		$update = mysqli_query($db_conx,$dislikes_update);
		$update_dislike_status= "UPDATE dislike_check set dislike_status = 'N' where user_name='$username' AND article_id='$article_id'" ;
		$querydislikestatusupdate = mysqli_query($db_conx,$update_dislike_status);
		
		if($update)
		{echo $dislikes;}else{echo "Something Wrong";}

		}
		else
		{
		$getdislikes = "select * from articles where article_id='$article_id' ";
		$query = mysqli_query($db_conx,$getdislikes);
		$row =mysqli_fetch_row($query);

		$dislikes = $row['9'];
		$dislikes += 1;
		$dislikes_update = "UPDATE articles set dislikes = '$dislikes' where article_id='$article_id'" ;
		$update = mysqli_query($db_conx,$dislikes_update);
		$update_dislike_status= "UPDATE dislike_check set dislike_status = 'Y' where user_name='$username' AND article_id='$article_id' ";
		$querydislikestatusupdate = mysqli_query($db_conx,$update_dislike_status);
		if($update)
		{echo $dislikes;}else{echo "Something Wrong";}

		exit();
		}

	}
}




?>
















