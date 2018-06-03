<html lang="en">
  <head>
    <meta name="google-signin-scope" content="profile email">
    <meta name="google-signin-client_id" content="219967070660-0ldeeu4hrb11i7dsoq2i86crspqr104n.apps.googleusercontent.com">
    <script src="https://apis.google.com/js/platform.js" async defer></script>
  </head>
  <body onload="myFunction()">
    <div class="g-signin2" id="google" data-onsuccess="onSignIn" data-theme="dark"></div>
    <script>
    function myFunction() {
      document.getElementById("google").style.visibility ="hidden";
    setTimeout(function(){ redirect(); }, 1000);
}

    function redirect(){
       window.location.href="596841401/logout.php";
    }
   
      function onSignIn(googleUser) {
        // Useful data for your client-side scripts:
        
        var profile = googleUser.getBasicProfile();
        // The ID token you need to pass to your backend:
        var id_token = googleUser.getAuthResponse().id_token;
        
        signOut();
      };

    </script>
    <script>
  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
      
      

    });
  }

</script>

    


  </body>
</html>