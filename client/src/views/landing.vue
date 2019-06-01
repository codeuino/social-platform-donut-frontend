<template>
<div>

  <header class="masthead">
    <div class="container d-flex h-100 align-items-center">
      <div class="mx-auto text-center">
        <h1 class="mx-auto my-0 text-uppercase">CODUEINO'S</h1>
        <h2 class="text-white-50 mx-auto mt-2 mb-5">OPEN SOURCE SOCIAL PLATFORM.</h2>
        <a href="#about" class="btn btn-primary js-scroll-trigger" data-toggle="modal" data-target="#exampleModalCenter">Let's Get Started</a>
        <!-- Modal -->
        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header row d-flex justify-content-between">
                <div class="col-md-6">
                  <button class="btn btn-lg " id="loginButton">Login</button>
                </div>
                <div class="col-md-6">
                  <button class="btn btn-lg" id="signupButton">Sign up</button>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              </div>
              <div class="modal-body" id="loginModal">
                <div class="container d-flex flex-column justify-content-center w-75">
                  <a href="/auth/github" class="btn btn-dark js-scroll-trigger mb-2">Login Using <i class="fab fa-github" style="font-size: 24px;"></i></a>
                  <a href="/auth/google" class="btn btn-danger js-scroll-trigger mb-2">Login Using <i class="fab fa-google" style="font-size: 24px;"></i></a>
                  <a href="#" class="btn btn-primary js-scroll-trigger">Login Using <i class="fas fa-envelope" style="font-size: 24px;"></i></a>
                </div>
              </div>
               <div class="modal-body displayOff" id="signupModal">
                <div class="container d-flex flex-column justify-content-center w-75">
                  <a href="/auth/github" class="btn btn-dark js-scroll-trigger mb-2">Sign Up Using <i class="fab fa-github" style="font-size: 24px;"></i></a>
                  <a href="/auth/google" class="btn btn-danger js-scroll-trigger mb-2">Sign Up Using <i class="fab fa-google" style="font-size: 24px;"></i></a>
                  <a href="/auth/signup" class="btn btn-primary js-scroll-trigger">Sign Up Using <i class="fas fa-envelope" style="font-size: 24px;"></i></a>
                </div>
              </div>
              <div class="modal-footer">
                Are you a Organisation? <a href="signup_community.html">Click Here</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>




  <section id="projects" class="projects-section bg-light">
    <div class="container">


      <div class="row align-items-center no-gutters mb-4 mb-lg-5">
        <div class="col-xl-8 col-lg-7">
          <img class="img-fluid mb-3 mb-lg-0" src="img/back.jpg" alt="">
        </div>
        <div class="col-xl-4 col-lg-5">
          <div class="featured-text text-center text-lg-left">
            <h4>ABOUT DONUT</h4>
            <p class="text-black-50 mb-0">This is an Open Source social Platform where people can interact with Open Source expertise around the globe and work on different projects.</p>
          </div>
        </div>
      </div>


      <div class="row justify-content-center no-gutters mb-5 mb-lg-0">
        <div class="col-lg-6">
          <img class="img-fluid" src="img/thumb-1920-587777%20(3).jpg" alt="">
        </div>
        <div class="col-lg-6">
          <div class="bg-black text-center h-100 project">
            <div class="d-flex h-100">
              <div class="project-text w-100 my-auto text-center text-lg-left">
                <h4 class="text-white">WELCOME TO CODEUINO</h4>
                <p class="mb-0 text-white-50">READY FOR SOME OPEN SOURCE?</p>
                <hr class="d-none d-lg-block mb-0 ml-0">
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Project Two Row -->
      <div class="row justify-content-center no-gutters">
        <div class="col-lg-6">
          <img class="img-fluid" src="img/keyboard-966308_960_720%20(2).jpg" alt="">
        </div>
        <div class="col-lg-6 order-lg-first">
          <div class="bg-black text-center h-100 project">
            <div class="d-flex h-100">
              <div class="project-text w-100 my-auto text-center text-lg-right">
                <h4 class="text-white">ABOUT THE PROJECTS</h4>
                <p class="mb-0 text-white-50">Projects filler text.</p>


                <a href="#projects" class="btn btn-primary js-scroll-trigger">PROJECTS</a>
              </div>
            </div>
          </div>
        </div>
      </div>

   <div class="row justify-content-center no-gutters mb-5 mb-lg-0">
        <div class="col-lg-6">
          <img class="img-fluid" src="img/eventcd%20(2).jpg" alt="">
        </div>
        <div class="col-lg-6">
          <div class="bg-black text-center h-100 project">
            <div class="d-flex h-100">
              <div class="project-text w-100 my-auto text-center text-lg-left">
                <h4 class="text-white">ABOUT THE EVENTS</h4>
                <p class="mb-0 text-white-50">Events filler text.</p>
        <a href="#about" class="btn btn-primary js-scroll-trigger">EVENTS</a>

              </div>
            </div>
          </div>
        </div>
      </div>

  <div class="row justify-content-center no-gutters">
        <div class="col-lg-6">
          <img class="img-fluid" src="img/coding-dark-computer-bokeh-illustration%20(2).jpg" alt="">
        </div>
        <div class="col-lg-6 order-lg-first">
          <div class="bg-black text-center h-100 project">
            <div class="d-flex h-100">
              <div class="project-text w-100 my-auto text-center text-lg-right">
                <h4 class="text-white">ABOUT THE SCHOLARSHIPS</h4>
                <p class="mb-0 text-white-50">Scholarships filler text.</p>
                <a href="#about" class="btn btn-primary js-scroll-trigger">SCHOLARSHIPS</a>
              </div>
            </div>
          </div>
        </div>
      </div>

   <div class="row justify-content-center no-gutters mb-5 mb-lg-0">
        <div class="col-lg-6">
          <img class="img-fluid" src="img/different%20(2).jpg" alt="">
        </div>
        <div class="col-lg-6">
          <div class="bg-black text-center h-100 project">
            <div class="d-flex h-100">
              <div class="project-text w-100 my-auto text-center text-lg-left">
                <h4 class="text-white">ABOUT DIFFERENT</h4>
                <p class="mb-0 text-white-50">Different filler text.</p>
                <a href="#about" class="btn btn-primary js-scroll-trigger">DIFFERENT</a>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>


  <section id="signup" class="signup-section">
    <div class="container">
      <div class="row">
        <div class="col-md-10 col-lg-8 mx-auto text-center">


          <h2 class="text-white mb-5">Thank you for visiting!</h2>



        </div>
      </div>
    </div>
  </section>


  <section class="contact-section bg-black">
    <div class="container">

      <div class="social d-flex justify-content-center">

        <a href="https://github.com/codeuino/Social-Platform-Donut" class="mx-2">
          <i class="fab fa-github"></i>
        </a>
      </div>

    </div>
  </section>


</div>
</template>

<script>


</script>
