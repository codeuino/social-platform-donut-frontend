<?php

if(isset($_POST['article_id'])){

	$article_id = $_POST['article_id'];






	


	echo '			<div class="modal-dialog">

    
			    <div class="modal-content">
			      <div class="modal-header">
			        <button type="button" class="close" data-dismiss="modal">&times;</button>
			        <h4 class="modal-title">Checking</h4>
			      </div>
			      <div class="modal-body">
			        
				<h2>Media Object</h2>
                <p>Use the "media-left" class to left-align a media object. Text that should appear next to the image, is placed inside a container with class="media-body".</p>
                <p>Tip: Use the "media-right" class to right-align the media object.</p><br>
                
                <!-- Left-aligned media object -->
                <div class="media">
                  <div class="media-left">
                    <img src="profile.png" class="media-object" style="width:60px">
                  </div>
                  <div class="media-body">
                    <h4 class="media-heading">Left-aligned</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  </div>
                </div>
                <hr>
                
               
            
			</div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>

  </div>';
}

?>