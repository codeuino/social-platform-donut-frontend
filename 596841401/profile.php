<?php
include_once("check_login_status.php");
if($user_ok==false){
  header("location:../donut.php");
  exit();
}
include('functions.php');
// Initialize any variables that the page might echo
$u = "";
$sex = "Male";
$userlevel = "";
$country = "";
$joindate = "";
$lastsession = "";
// Make sure the _GET username is set, and sanitize it
if(isset($_GET["u"])){
  $u = preg_replace('#[^a-z0-9]#i', '', $_GET['u']);
} else {
    header("location: ../donut.php");
    exit(); 
}
// Select the member from the users table
$sql = "SELECT * FROM users WHERE username='$u' LIMIT 1";
$user_query = mysqli_query($db_conx, $sql);
// Now make sure that user exists in the table
$numrows = mysqli_num_rows($user_query);
if($numrows < 1){
  header("location: ../donut.php");
    exit(); 
}
// Check to see if the viewer is the account owner
$isOwner = "no";
if($u == $log_username && $user_ok == true){
  $isOwner = "yes";
}
// Fetch the user row from the query above
while ($row = mysqli_fetch_array($user_query, MYSQLI_ASSOC)) {
  $profile_id = $row["id"];
  $gender = $row["gender"];
  $country = $row["country"];
  $mobile =$row["mobile_number"];
  $email = $row["email"];
  $bio =$row ["bio"];
  $avatar =$row ["avatar"];
  $userlevel = $row["userlevel"];
  $education = $row["education"];
  $worksat = $row["works_at"];
  $livesin = $row["lives_in"];
  $addmore = $row["add_more"];
  $lovesto = $row["loves_to"];
  $signup = $row["signup"];
  $lastlogin = $row["lastlogin"];
  $username = ucwords($row["name"]);
  $user_name =$row["username"];
  $followers =$row["followers"];
  $joindate = strftime("%b %d, %Y", strtotime($signup));
  $lastsession = strftime("%b %d, %Y", strtotime($lastlogin));
  if($gender == "f"){
    $sex = "Female";
  }
}
?>




<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->


    <title><?php if(isset($_COOKIE['user'])){$owner = $_COOKIE['user']; fetchowner($owner);} ?>: Profile</title>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
     <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
      <link rel="stylesheet" type="text/css" href="../css/settings.css">
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  </head>

  <body>

    

<nav class="nav-container navbar navbar-default navbar-fixed-top">
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="../donut.php"><span class="donut"><i class="material-icons">book</i>Donut </span></a>
    </div>
    

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      
      <ul class="nav navbar-nav navbar-right">
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><?php if(isset($_COOKIE['user'])){$owner = $_COOKIE['user']; fetchname($owner);} ?> <img src="<?php if(isset($_COOKIE['user'])){$owner = $_COOKIE['user']; fetchavatar($owner);}?>" alt="profile.png" class="img-circle" width="20" height="20"></span></a>
          <ul class="dropdown-menu dropdown-self">
            <li><a href="../donut.php">Home</a></li>
            <li><a href="settings.php?u=<?php if(isset($_COOKIE['user'])){$owner = $_COOKIE['user']; fetchusername($owner);} ?>">Settings</a></li>
            <li><a href="profile.php?u=<?php if(isset($_COOKIE['user'])){$owner = $_COOKIE['user']; fetchusername($owner);} ?>">Profile</a></li>
            <li role="separator" class="divider"></li>
            <li><a href="contact.php">Contact Us</a><a href="../logout.php">Logout</a><a href="advertise.php">Advertise with us</a></li>
          </ul>
        </li>
      </ul>
      <form class="navbar-form navbar-right">
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Search">
        </div>
        <button type="submit" class="btn btn-default">Submit</button>
      </form>
      <ul class="nav navbar-nav navbar-right">
       <?php // <li class="active"><a href="#"><span style="color:red;" class="glyphicon glyphicon-bell"></span>&nbsp;&nbsp;Notifications</a></li> ?> 

      </ul>
    </div><!-- /.navbar-collapse -->
  </div>
</nav>

    
        <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
          <h1 class="page-header"><?php echo $username;?>&nbsp;&nbsp; <span style="font-size: 2rem;font-family: verdana;"><?php echo $bio;?> </span>&nbsp;<?php if($isOwner=="yes" && $bio==""){echo"<button type='submit' class='btn btn-default btn-sm' data-toggle='modal' data-target='#changebio' >Add Bio</button>";}else if($isOwner=="yes" && $bio!=""){echo "<button type='submit'  class='btn btn-default btn-sm' data-toggle='modal' data-target='#changebio' >Change Bio</button>";} else{echo "";} ?></h1>

          <div class="row placeholders profile-pic">
            <div class="col-xs-6 col-sm-3 placeholder">
              <img src="<?php echo $avatar;?>" width="200" height="200" class="img-responsive" alt="Generic placeholder thumbnail">
              <h4><?php echo $username;?></h4>
              <span class="text-muted">Writer</span>
              <br>
              <?php if($isOwner=="yes"){echo"<button type='submit' id='changedp' class='btn btn-primary btn-sm'>Change</button>";}else echo '<button type="button" id="followbutton" onclick="follow()" class="btn btn-default">'.$followers.' Followers</button>'; ?>
              <br><br>
              <?php if($isOwner=="yes"){echo '<button type="button" class="btn btn-default">'.$followers.' Followers</button>';}?>
            </div>
            
            
            

          <h2 class="sub-header"><?php echo $username;?> Donuts </h2>
          <div class="table-responsive">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Sorted with date</th>
                 </tr>
              </thead>
                 <tr>
                  <td> <span style="color:blue;" class="glyphicon glyphicon-education"></span> &nbsp;&nbsp;Studied  </td>
                  <td><?php if($education==""){echo "Not Available";} else  echo $education ;?></td>
                  <td><?php if($isOwner=="yes" && $user_ok==true) {echo "<button type='submit' id='educationchange' class='btn btn-default btn-sm' data-toggle='modal' data-target='#changeeducation'> Change </button>";}?> </td>
                  
                </tr>
                <tr>
                  <td><span style="color:black;" class="glyphicon glyphicon-briefcase"></span> &nbsp;&nbsp;Works At</td>
                  <td><?php if($worksat==""){echo "Not Available";} else echo $worksat; ?></td>
                  <td><?php if($isOwner=="yes" && $user_ok==true) {echo "<button type='submit'  class='btn btn-default btn-sm' data-toggle='modal' data-target='#changeworksat'> Change</button>";}?></td>
                  
                </tr>
                <tr>
                  <td><span style="color:brown;" class="glyphicon glyphicon-home"></span> &nbsp;&nbsp; Lives in</td>
                   <td><?php if($livesin==""){echo "Not Available";} else echo $livesin; ?></td>
                  <td><?php if($isOwner=="yes" && $user_ok==true) {echo "<button type='submit' class='btn btn-default btn-sm' data-toggle='modal' data-target='#changelivesin' >Change</button>";}?></td>
                 
                </tr>
                <tr>
                  <td><span style="color:#931023;" class="glyphicon glyphicon-star"></span> &nbsp;&nbsp;&nbsp;&nbsp;More</td>
                  <td><?php if($addmore==""){echo "Not Available";} else echo $addmore; ?></td>
                  <td><?php if($isOwner=="yes" && $user_ok==true) {echo "<button type='submit' class='btn btn-default btn-sm' data-toggle='modal' data-target='#changeaddmore' >Change</button>";}?></td>
                  
                </tr>
                <tr>
                  <td><span style="color:red;" class="glyphicon glyphicon-heart"></span> &nbsp;&nbsp;loves to</td>
                  <td><?php if($lovesto==""){echo "Not Available";} else echo $lovesto; ?></td>
                  <td><?php if($isOwner=="yes" && $user_ok==true) {echo "<button type='submit' class='btn btn-default btn-sm' data-toggle='modal' data-target='#changelovesto' >Change</button>";}?></td>
                  
                </tr>
                 <thead>
            </table>
          </div>
        </div>
      </div>
    </div>

                <div id="changebio" class="modal fade" role="dialog">
                  <div class="modal-dialog">

                    <!-- Modal content-->
                      <div class="modal-content">
                      <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Add Education</h4>
                      </div>
                      <div class="modal-body">
                            
                                <div class="form-group">
                                <label for="Name">Enter grad School</label>
                                <input type="text" class="form-control" id="bio" placeholder="Enter bio in not more than 100 characters" maxlength="99" >
                              </div>
                          </div>
                        <div class="modal-footer">
                        <span class="label label-success" id="biostatus"></span>
                        <button type="submit" class="btn btn-default" onclick="changebio()">Update</button>
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                      </div>
                    </div>
                  </div>
                </div>


            <div id="changeeducation" class="modal fade" role="dialog">
                  <div class="modal-dialog">

                    <!-- Modal content-->
                      <div class="modal-content">
                      <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Add Education</h4>
                      </div>
                      <div class="modal-body">
                            
                                <div class="form-group">
                                <label for="Name">Enter Education</label>
                                <input type="text" class="form-control" id="education" placeholder="Enter your gradschool in not more than 100 characters" maxlength="99" >
                              </div>
                          </div>
                    <div class="modal-footer">
                        <span class="label label-success" id="educationstatus"></span>
                        <button type="submit" class="btn btn-default" onclick="changeeducation()">Update</button>
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                  </div>
                </div>
              </div>



              <div id="changeworksat" class="modal fade" role="dialog">
                  <div class="modal-dialog">

                    <!-- Modal content-->
                      <div class="modal-content">
                      <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Add a new workplace</h4>
                      </div>
                      <div class="modal-body">
                            
                                <div class="form-group">
                                <label for="Name">Enter your workplace</label>
                                <input type="text" class="form-control" id="worksat" placeholder="Add workplace in not more than 100 characters" maxlength="99" >
                              </div>
                          </div>
                    <div class="modal-footer">
                        <span class="label label-success" id="worksatstatus"></span>
                        <button type="submit" class="btn btn-default" onclick="changeworksat()">Update</button>
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                  </div>
                </div>
              </div>


            <div id="changelivesin" class="modal fade" role="dialog">
                  <div class="modal-dialog">

                    <!-- Modal content-->
                      <div class="modal-content">
                      <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Add your home</h4>
                      </div>
                      <div class="modal-body">
                            
                                <div class="form-group">
                                <label for="Name">Enter your location</label>
                                <input type="text" class="form-control" id="livesin" placeholder="Enter your location in not more than 100 characters" maxlength="99" >
                              </div>
                          </div>
                    <div class="modal-footer">
                        <span class="label label-success" id="livesinstatus"></span>
                        <button type="submit" class="btn btn-default" onclick="changelivesin()">Update</button>
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                  </div>
                </div>
              </div>

              <div id="changeaddmore" class="modal fade" role="dialog">
                  <div class="modal-dialog">

                    <!-- Modal content-->
                      <div class="modal-content">
                      <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Add something specific about you</h4>
                      </div>
                      <div class="modal-body">
                            
                                <div class="form-group">
                                <label for="Name">Enter anything you want</label>
                                <input type="text" class="form-control" id="addmore" placeholder="Enter not more than 100 characters" maxlength="99" >
                              </div>
                          </div>
                    <div class="modal-footer">
                        <span class="label label-success" id="addmorestatus"></span>
                        <button type="submit" class="btn btn-default" onclick="changeaddmore()">Update</button>
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                  </div>
                </div>
              </div>


              <div id="changelovesto" class="modal fade" role="dialog">
                  <div class="modal-dialog">

                    <!-- Modal content-->
                      <div class="modal-content">
                      <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Add your hobbies</h4>
                      </div>
                      <div class="modal-body">
                            
                                <div class="form-group">
                                <label for="Name">Enter hobbies</label>
                                <input type="text" class="form-control" id="lovesto" placeholder="Enter your hobbies in not more than 100 characters" maxlength="99" >
                              </div>
                          </div>
                    <div class="modal-footer">
                        <span class="label label-success" id="lovestostatus"></span>
                        <button type="submit" class="btn btn-default" onclick="changelovesto()">Update</button>
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                  </div>
                </div>
              </div>




    <script type="text/javascript">


          function ajaxObj( meth, url ) {
              var x = new XMLHttpRequest();
              x.open( meth, url, true );
              x.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
              return x;
            }
            function ajaxReturn(x){
              if(x.readyState == 4 && x.status == 200){
                  return true;  
              }
            }


      
      function changebio(){
          var bio = document.getElementById("bio").value;
          var username = "<?php echo $user_name;?>";
          var owner ="<?php echo $isOwner;?>";
         
                if(bio.length>100){
                   document.getElementById("biostatus").innerHTML ="Not more than 100 characters";
                }
                
                if(bio=="" || username=="")
                {
                document.getElementById("biostatus").innerHTML ="At least write something";
                }
                if(owner=="no"){
                  document.getElementById("biostatus").innerHTML = "Don't fool us, you are not the owner of this profile";
                }
                if(bio!= "" && username!="" && owner=="yes" && bio.length<100){
                  document.getElementById("biostatus").innerHTML = "Checking";
                  var ajax = ajaxObj("POST", "changebio.php");
                      ajax.onreadystatechange = function() {
                        if(ajaxReturn(ajax) == true) {
                            document.getElementById("biostatus").innerHTML = ajax.responseText;
                            if(ajax.responseText == "Successfully Updated"){
                              location.reload();
                            }
                        }
                      }
                      ajax.send("bio="+bio+"&username="+username);
                }
              }


              function follow(){


          var tofollow ="<?php echo $user_name;?>";
          var owner = "<?php echo $isOwner;?>";
          var follower ="<?php if(isset($_COOKIE['user'])){$logedin_user = $_COOKIE['user']; echo $logedin_user; }?>";
         
                
               
               
                if(tofollow!= "" && follower!="" && owner=="no"){
                  var ajax = ajaxObj("POST", "follow.php");
                      ajax.onreadystatechange = function() {
                        if(ajaxReturn(ajax) == true) {
                            document.getElementById("followbutton").innerHTML = ajax.responseText +" " +"followers";
                          }  
                        }
                      ajax.send("tofollow="+tofollow+"&owner="+owner+"&follower="+follower);
                
              }
            }


            

            function changeeducation(){
              var education = document.getElementById("education").value;
          var username = "<?php echo $user_name;?>";
          var owner ="<?php echo $isOwner;?>";
         
                if(education.length>100){
                   document.getElementById("educationstatus").innerHTML ="Not more than 100 characters";
                }
                
                if(education=="" || username=="")
                {
                document.getElementById("educationstatus").innerHTML ="At least write something";
                }
                if(owner=="no"){
                  document.getElementById("educationstatus").innerHTML = "Don't fool us, you are not the owner of this profile";
                }
                if(education!= "" && username!="" && owner=="yes" && education.length<100){
                  document.getElementById("educationstatus").innerHTML = "Checking";
                  var ajax = ajaxObj("POST", "changeeducation.php");
                      ajax.onreadystatechange = function() {
                        if(ajaxReturn(ajax) == true) {
                            document.getElementById("educationstatus").innerHTML = ajax.responseText;
                            if(ajax.responseText == "Successfully Updated"){
                              location.reload();
                            }
                        }
                      }
                      ajax.send("education="+education+"&username="+username);
                }

            }

            
            function changeworksat(){
          var worksat = document.getElementById("worksat").value;
          var username = "<?php echo $user_name;?>";
          var owner ="<?php echo $isOwner;?>";
         
                if(worksat.length>100){
                   document.getElementById("worksatstatus").innerHTML ="Not more than 100 characters";
                }
                
                if(worksat=="" || username=="")
                {
                document.getElementById("worksatstatus").innerHTML ="At least write something";
                }
                if(owner=="no"){
                  document.getElementById("worksatstatus").innerHTML = "Don't fool us, you are not the owner of this profile";
                }
                if(worksat!= "" && username!="" && owner=="yes" && worksat.length<100){
                  document.getElementById("worksatstatus").innerHTML = "Checking";
                  var ajax = ajaxObj("POST", "changeworksat.php");
                      ajax.onreadystatechange = function() {
                        if(ajaxReturn(ajax) == true) {
                            document.getElementById("worksatstatus").innerHTML = ajax.responseText;
                            if(ajax.responseText == "Successfully Updated"){
                              location.reload();
                            }
                        }
                      }
                      ajax.send("worksat="+worksat+"&username="+username);
                }

            }

            function changelivesin(){

              var livesin = document.getElementById("livesin").value;
          var username = "<?php echo $user_name;?>";
          var owner ="<?php echo $isOwner;?>";
         
                if(livesin.length>100){
                   document.getElementById("livesinstatus").innerHTML ="Not more than 100 characters";
                }
                
                if(livesin=="" || username=="")
                {
                document.getElementById("livesinstatus").innerHTML ="At least write something";
                }
                if(owner=="no"){
                  document.getElementById("livesinstatus").innerHTML = "Don't fool us, you are not the owner of this profile";
                }
                if(livesin!= "" && username!="" && owner=="yes" && livesin.length<100){
                  document.getElementById("livesinstatus").innerHTML = "Checking";
                  var ajax = ajaxObj("POST", "changelivesin.php");
                      ajax.onreadystatechange = function() {
                        if(ajaxReturn(ajax) == true) {
                            document.getElementById("livesinstatus").innerHTML = ajax.responseText;
                            if(ajax.responseText == "Successfully Updated"){
                              location.reload();
                            }
                        }
                      }
                      ajax.send("livesin="+livesin+"&username="+username);
                }


            }

            function changeaddmore(){
              var addmore = document.getElementById("addmore").value;
          var username = "<?php echo $user_name;?>";
          var owner ="<?php echo $isOwner;?>";
         
                if(addmore.length>100){
                   document.getElementById("addmorestatus").innerHTML ="Not more than 100 characters";
                }
                
                if(addmore=="" || username=="")
                {
                document.getElementById("addmorestatus").innerHTML ="At least write something";
                }
                if(owner=="no"){
                  document.getElementById("addmorestatus").innerHTML = "Don't fool us, you are not the owner of this profile";
                }
                if(addmore!= "" && username!="" && owner=="yes" && addmore.length<100){
                  document.getElementById("addmorestatus").innerHTML = "Checking";
                  var ajax = ajaxObj("POST", "changeaddmore.php");
                      ajax.onreadystatechange = function() {
                        if(ajaxReturn(ajax) == true) {
                            document.getElementById("addmorestatus").innerHTML = ajax.responseText;
                            if(ajax.responseText == "Successfully Updated"){
                              location.reload();
                            }
                        }
                      }
                      ajax.send("addmore="+addmore+"&username="+username);
                }


            }

            function changelovesto(){

              var lovesto = document.getElementById("lovesto").value;
          var username = "<?php echo $user_name;?>";
          var owner ="<?php echo $isOwner;?>";
         
                if(lovesto.length>100){
                   document.getElementById("lovestostatus").innerHTML ="Not more than 100 characters";
                }
                
                if(lovesto=="" || username=="")
                {
                document.getElementById("lovestostatus").innerHTML ="At least write something";
                }
                if(owner=="no"){
                  document.getElementById("lovestostatus").innerHTML = "Don't fool us, you are not the owner of this profile";
                }
                if(lovesto!= "" && username!="" && owner=="yes" && lovesto.length<100){
                  document.getElementById("lovestostatus").innerHTML = "Checking";
                  var ajax = ajaxObj("POST", "changelovesto.php");
                      ajax.onreadystatechange = function() {
                        if(ajaxReturn(ajax) == true) {
                            document.getElementById("lovestostatus").innerHTML = ajax.responseText;
                            if(ajax.responseText == "Successfully Updated"){
                              location.reload();
                            }
                        }
                      }
                      ajax.send("lovesto="+lovesto+"&username="+username);
                }


            }





            
    </script>


          
  </body>
</html>
