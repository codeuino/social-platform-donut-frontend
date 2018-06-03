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


function _(x){
	return document.getElementById(x);
}


function restrict(elem){
	var tf = _(elem);
	var rx = new RegExp;
	if(elem == "email"){
		rx = /[' "]/gi;
	} else if(elem == "username"){
		rx = /[^a-z0-9]/gi;
	} else if(elem == "mobile"){
		rx = /[^0-9]/g;
	}else if(elem =="name")
	{
		rx= /[^a-z ]/gi;

	}
	tf.value = tf.value.replace(rx, "");
}

function checkusername(){
	var u = _("username").value;
	if(u != ""){
		_("unamestatus").innerHTML = 'checking ...';
		var ajax = ajaxObj("POST", "596841401/signup.php");
        ajax.onreadystatechange = function() {
	        if(ajaxReturn(ajax) == true) {
	            _("unamestatus").innerHTML = ajax.responseText;
	        }
        }
        ajax.send("usernamecheck="+u);
	}
}

function emptyElement(x){
	_(x).innerHTML = "";
}
function signup(){
	var u = _("username").value;
	var e = _("email").value;
	var p1= _("pass1").value;
	var g = _("gender").value;
	var m = _("mobile").value;
	var n = _("name").value;
	var status = _("status");

	if(g=="Mr."){
		g="m";
	}else if(g=="Ms." || g=="Mrs."){
		g="f";
	}


	if(u == "" || e == "" || p1 == "" || g == "" || m == "" || n==""){
		status.innerHTML = "Fill out all of the form data";
	} 
	else {
		_("signupbtn").style.display = "none";
		status.innerHTML = 'please wait ...';
		var ajax = ajaxObj("POST", "596841401/signup.php");
        ajax.onreadystatechange = function() {
	        if(ajaxReturn(ajax) == true) {
	            if(ajax.responseText != "signup_success"){
					status.innerHTML = ajax.responseText;
					_("signupbtn").style.display = "block";
				} else {
					window.scrollTo(0,0);
					_("signupform").innerHTML = "OK "+u+", check your email inbox and junk mail box at <u>"+e+"</u> in a moment to complete the sign up process by activating your account. You will not be able to do anything on the site until you successfully activate your account.";
				}
	        }
        }
        ajax.send("u="+u+"&e="+e+"&p="+p1+"&m="+m+"&g="+g+"&n="+n);
	}
}

function login(){
	var e = _("emaillogin").value;
	var p = _("password").value;
	if(e == "" || p == ""){
		_("statuslogin").innerHTML = "Fill out all of the form data";
	} else {
		_("loginbtn").style.display = "none";
		_("statuslogin").innerHTML = 'please wait ...';
		var ajax = ajaxObj("POST", "596841401/login.php");
        ajax.onreadystatechange = function() {
	        if(ajaxReturn(ajax) == true) {
	            if(ajax.responseText == "login_failed"){
					_("statuslogin").innerHTML = "Email or Password Incorrect";
					_("loginbtn").style.display = "block";
				} else {
					window.location = "596841401/user.php?u="+ajax.responseText;
				}
	        }
        }
        ajax.send("e="+e+"&p="+p);
	}
}

function onSignIn(googleUser) {
        // Useful data for your client-side scripts:
        var profile = googleUser.getBasicProfile();
        console.log("ID: " + profile.getId()); // Don't send this directly to your server!
        console.log('Full Name: ' + profile.getName());
        console.log('Given Name: ' + profile.getGivenName());
        console.log('Family Name: ' + profile.getFamilyName());
        console.log("Image URL: " + profile.getImageUrl());
        console.log("Email: " + profile.getEmail());
       
        // The ID token you need to pass to your backend:
        var id_token = googleUser.getAuthResponse().id_token;
        console.log("ID Token: " + id_token);

    			var u = profile.getId();
    			var n = profile.getName();
    			var e = profile.getEmail();
    			var img =profile.getImageUrl();
    			var ajax = ajaxObj("POST", "596841401/google_signin.php");
        		ajax.onreadystatechange = function() {
          		if(ajaxReturn(ajax) == true) {
             	var response = ajax.responseText;
             				if(response=="registered"){
             					send(e,u);}
             					else {
             					send(e,u);}
                }

          }
        
        ajax.send("u="+u+"&n="+n+"&e="+e+"&img="+img+"&id_token="+id_token);

  


      };

function send(e,u){
	var p = u;
    var ajax = ajaxObj("POST", "596841401/login.php");
        ajax.onreadystatechange = function() {
          if(ajaxReturn(ajax) == true) {
             if(ajax.responseText=="login_failed"){
             	alert(ajax.responseText);
             	_("statuslogin").innerHTML = "An error occured, please sign up";
             }else{
             	
             		window.location = "596841401/user.php?u="+ajax.responseText;

             }
              
              
              
            }
        }
        ajax.send("e="+e+"&p="+p);
  }

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }
