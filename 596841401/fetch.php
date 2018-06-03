<?php

function get_articles($real_user){ 

				include('db_conx.php');	
					$get_articles="select * from articles limit 20";
					$run_topics=mysqli_query($db_conx,$get_articles);
					
					while($row=mysqli_fetch_row($run_topics)){			
							$contentname=ucwords($row['4']);	
							$id= $row['0'];
							$tagline=ucfirst($row['5']);
							$genre=ucwords($row['6']);
							$content = $row['7'];
							$date_added =$row['8'];
							$username = $row['1'];
							$likes = $row['2'];
							$views =$row['3'];
							$dislikes =$row['9'];
							$fetch_name ="SELECT * FROM users where username='$username' ";
							$query = mysqli_query($db_conx, $fetch_name);
							$user_data = mysqli_fetch_row($query);
							$user_name =ucwords($user_data['15']);
							$comment = $row['10'];




							echo '<div class="blog-post">
                          <h2 class="blog-post-title">'.$contentname.' <span class="label label-success">'.$tagline.'</span><br><span style="background-color:#2196F3;" class="badge">'.$genre.'</span></a><br></h2>
              			<p class="blog-post-meta"> On '.$date_added.' &nbsp; &nbsp; &nbsp; By &nbsp;<a href="profile.php?u='.$username.'">'.$user_name.'</a></p>
              			<p class="lead"> '.$content.' </p>
              			<p class="lead">
              			<div class="btn-group">
  						<button type="button" class="btn btn-default"><span style="color:#BD3733;" class="glyphicon glyphicon-eye-open margin"> '.$views.'</span></button>
  						<button type="button" id="'.$id.'" onClick="reply_click(this.id)" class="btn btn-default"><span class="glyphicon glyphicon-heart-empty margin"><span id="'.$id.'likes"> '.$likes.'</span></span></button>
  						<button type="button" id="'.$id.'" onClick="reply_click_dislikes(this.id)" class="btn btn-default"><span class="glyphicon glyphicon glyphicon-thumbs-down margin"><span id="'.$id.'dislikes"> '.$dislikes.'</span></span></button>
  						<button type="button" id="commentlogo'.$id.'" onclick="fetchcomments(this.id)" data-toggle="modal" data-target="#commentsmodal" class = "btn btn-default"><span class="glyphicon glyphicon-comment margin"> '.$comment.'</span></button></p>
						
              			</div><br><br>
              			<div class="media" style="background-color:#F7F7F7; padding:2%;">
							    <div class="media-left">
							      <img src="profile.png" class="media-object img-circle" style="width:60px">
							    </div>
							    <div class="media-body">
							      <h4 class="media-heading">'.$real_user.'</h4>
							      
							      <div class="col-sm-8 form-inline">
							      <p><input type="text" id="comment'.$id.'" class="form-control"  onfocus="showcommentbutton(this.id)" placeholder="Add a comment"> <button type="button" id="commentbutton'.$id.'" style="visibility:hidden;" class="btn btn-primary" onclick="comment(this.id)">Comment</button> </p>
							      </div>
							    </div>
							  </div><br><br>
          				</div>';	
							

								
						}
					}

					function getcontent($shub){
						//$con=mysqli_connect("localhost","root","","donut") or die("Something went wrong!!");
						//echo $shub;
					}

					?>



					