<?php

include_once('db_conx.php');

if(isset($_POST['username']) && isset($_POST['articleid']))
{
	$username = $_POST['username'];
	$articleid =$_POST['articleid'];
	$comment = $_POST['comment'];

	$sql = "INSERT into comments (article_id, user_name, comment, date_commented) Values ('$articleid','$username','$comment',now())";

	$query = mysqli_query($db_conx, $sql);

	

	$get_comments = "select comment from articles where article_id='$articleid'";
	$run_query= mysqli_query($db_conx,$get_comments);
	$get_comments = mysqli_fetch_row($run_query);
	$comments  =   $get_comments[0];

	$comments +=1;

	$update_comments= "update articles set comment = '$comments' where article_id = '$articleid' ";

	$execute_query = mysqli_query($db_conx,$update_comments);

	if($query){
		echo $comments;
	}
}




?>