<?php
include_once("check_login_status.php");
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
if($isOwner=="no"){
  header("location: ../donut.php");
  exit();
}
// Fetch the user row from the query above
while ($row = mysqli_fetch_array($user_query, MYSQLI_ASSOC)) {
  $profile_id = $row["id"];
  $gender = $row["gender"];
  $country = $row["country"];
  $mobile =$row["mobile_number"];
  $email = $row["email"];
  $avatar =$row ["avatar"];
  $userlevel = $row["userlevel"];
  $signup = $row["signup"];
  $lastlogin = $row["lastlogin"];
  $username = ucwords($row["name"]);
  $user_name =$row["username"];
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


    <title><?php echo $username;?> : Settings</title>
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
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><?php echo $username?><span>  <img src="<?php echo $avatar;?>" alt="profile.png" class="img-circle" width="20" height="20"></span></a>
          <ul class="dropdown-menu dropdown-self">
            <li><a href="../donut.php">Home</a></li>
            <li><a href="settings.php?u=<?php echo $user_name;?>">Settings</a></li>
            <li><a href="profile.php?u=<?php echo $user_name;?>">Profile</a></li>
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
      <?php //  <li class="active"><a href="#"><span style="color:red;" class="glyphicon glyphicon-bell"></span>&nbsp;&nbsp;Notifications</a></li>?>
      </ul>
    </div><!-- /.navbar-collapse -->
  </div>
</nav>

    
        <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
          <h1 class="page-header"><?php echo $username;?></h1>

          <div class="row placeholders profile-pic">
            <div class="col-xs-6 col-sm-3 placeholder">
              <img src="<?php echo $avatar;?>" width="200" height="200" class="img-responsive" alt="Generic placeholder thumbnail">
              <h4><?php echo $username;?></h4>
              <span class="text-muted">Writer</span>
              <br>
              <button type="submit" class="btn btn-primary btn-sm">Change</button>
            </div>
            
            
            

          <h2 class="sub-header">Profile Details</h2>
          <div class="table-responsive">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Click to update</th>
                 </tr>
              </thead>
              <tbody>
                
                <tr>
                  <td>Name </td>
                  <td><?php echo $username;?></td>
                  <td><button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#changename">Change</button></td>
                </tr>
                <tr>
                  <td>Password</td>
                  <td>*******</td>
                  <td><button type="button" class="btn btn-primary btn-sm disabled">Change</button></td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td><?php echo $email; ?></td>
                  <td><button type="button" class="btn btn-primary disabled btn-sm">Change</button></td>
                </tr>
                <tr>
                  <td>Mobile</td>
                  <td><?php echo $mobile; ?></td>
                  <td><button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#changemobile"">Change</button></td>
                </tr>
                <tr>
                  <td>Member Since</td>
                  <td><?php echo $joindate;?></td>
                  <td></td>
                </tr>
                <tr>
                  <td>Last Login</td>
                  <td><?php echo $lastlogin;?></td>
                  <td></td>
                </tr>
                 <tr>
                  <td>Country</td>
                  <td><?php echo $country;?></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>


    

<!-- Modal  for Name Change-->
<div id="changename" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
      <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Change Name</h4>
      </div>
      <div class="modal-body">
            
                <div class="form-group">
                <label for="Name">Enter Name</label>
                <input type="text" class="form-control" id="name" placeholder="Enter new name" >
              </div>
          </div>
        <div class="modal-footer">
        <span class="label label-success" id="namestatus"></span>
        <button type="submit" class="btn btn-default" onclick="changename()">Update</button>
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

<!-- Modal  for Name Change ends-->
          


          <!-- Modal  for Password Change-->
<div id="changepassword" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Change Password</h4>
      </div>
      <div class="modal-body">
                      <div class="form-group">
                          <label for="email">Enter old password</label>
                          <input type="email" class="form-control" id="changepassold" placeholder="Enter old password" >
                      </div>

                        <div class="form-group">
                           <label for="pwd">Enter new password:</label>
                           <input type="password" class="form-control" id="changepassnew" placeholder="Enter new password" name="pwd">
                        </div>
                        <div class="form-group">
                        <label for="pwd">Confirm new password:</label>
                        <input type="password" class="form-control" id="confirmpassnew" placeholder="Confirm new password" name="pwd">
                        </div>
            
                  </div>
                  <div class="modal-footer">
                  <span class="label label-success" id="changepassword"></span>
                  <button type="submit" class="btn btn-default">Update</button>
                  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                  </div>
                </div>
            </div>
        </div>
<!--Change password ends-->
      

        
        <!--Change email begins-->

                <div id="changeemail" class="modal fade" role="dialog">
                  <div class="modal-dialog">
                     <div class="modal-content">
                      <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                            <h4 class="modal-title">Change Email</h4>
                       </div>
                          <div class="modal-body">
                            <div class="form-group">
                                <label for="email">Enter new mail id</label>
                                  <input type="email" class="form-control" id="changeemail" placeholder="Enter new email" name="email">
                            </div>

                                <div class="form-group">
                                  <label for="pwd">Enter password:</label>
                                  <input type="password" class="form-control" id="pwd" placeholder="Enter password" name="pwd">
                                </div>                                                                                         
                            </div>
                            <div class="modal-footer">
                            <span class="label label-success" id="changeemail"></span>
                            <button type="submit" class="btn btn-default">Update</button>
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                          </div>
                        </div>
                     </div>
                 </div>

          <!--Change email ends-->



                             <!--Change Mobile Number begins-->

                <div id="changemobile" class="modal fade" role="dialog">
                  <div class="modal-dialog">
                     <div class="modal-content">
                      <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                            <h4 class="modal-title">Change Mobile Number</h4>
                       </div>
                          <div class="modal-body">
                            <div class="form-group">
                                <label for="Mobile">Enter new mobile Number</label>
                                  <input type="text" class="form-control" id="mobile" onkeyup="restrict('mobile')" placeholder="Enter Mobile without +91" >
                            </div>      
                                  
                            </div>
                            <div class="modal-footer">
                            <span class="label label-success" id="mobilestatus"></span>
                            <button type="submit" class="btn btn-default" onclick="changemobile()">Update</button>
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                          </div>
                        </div>
                     </div>
                 </div>

          <!--Change Mobile Number ends-->

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


            function changename(){
          var name = document.getElementById("name").value;
          var username = "<?php echo $user_name;?>";
          var owner ="<?php echo $isOwner;?>";
         

                if(name=="" || username=="")
                {
                document.getElementById("namestatus").innerHTML ="Fill in all feilds";
                }
                if(owner=="no"){
                  document.getElementById("namestatus").innerHTML = "Don't fool us, you are not the owner of this profile";
                }
                if(name!= "" && username!="" && owner=="yes"){
                  document.getElementById("namestatus").innerHTML = "Checking";
                  var ajax = ajaxObj("POST", "update.php");
                      ajax.onreadystatechange = function() {
                        if(ajaxReturn(ajax) == true) {
                            document.getElementById("namestatus").innerHTML = ajax.responseText;
                            if(ajax.responseText == "Successfully Updated"){
                              location.reload();
                            }
                        }
                      }
                      ajax.send("name="+name+"&username="+username);
                }
              }
            function changemobile(){

              var mobile = document.getElementById("mobile").value;
              var username = "<?php echo $user_name;?>";
              var length = mobile.length;

                if(mobile=="" || username=="" || length!=10)
                {
                document.getElementById("mobilestatus").innerHTML ="Mobile Number must be 10 digits";
                } 
                
                if(length==10 && username!=""){
                  document.getElementById("mobilestatus").innerHTML = "Checking";
                  var ajax = ajaxObj("POST", "update.php");
                      ajax.onreadystatechange = function() {
                        if(ajaxReturn(ajax) == true) {
                            document.getElementById("mobilestatus").innerHTML = ajax.responseText;
                            if(ajax.responseText == "Successfully Updated"){
                              location.reload();
                            }
                        }
                      }
                      ajax.send("mobile="+mobile+"&username="+username);
                }
              }

                function restrict(elem){
                  var tf = document.getElementById(elem);
                  var rx = new RegExp;
                   if(elem == "mobile"){
                    rx = /[^0-9]/g;
                  }
                  tf.value = tf.value.replace(rx, "");

                }


      function zoom(){
        document.body.style.zoom="80%";
      }
    
          </script>

          <script type="text/javascript">
  function zoom(){
    document.body.style.zoom = "80%";
  }
</script>

  </body>
</html>
