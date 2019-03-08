(function($) {
  'use strict'; // Start of use strict

  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (
      location.pathname.replace(/^\//, '') ==
        this.pathname.replace(/^\//, '') &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate(
          {
            scrollTop: target.offset().top - 70
          },
          1000,
          'easeInOutExpo'
        );
        return false;
      }
    }
  });

  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  $('body').scrollspy({
    target: '#mainNav',
    offset: 100
  });

  var navbarCollapse = function() {
    if ($('#mainNav').offset().top > 100) {
      $('#mainNav').addClass('navbar-shrink');
    } else {
      $('#mainNav').removeClass('navbar-shrink');
    }
  };

  navbarCollapse();

  /* Toggle active class on login/signup modal */
  function removeActiveClass(element) {
    while (element.hasClass('active')) {
      console.log(element);
      element.removeClass('active');
    }
  }
  $('#userSignuptab').on('click', e => {
    e.preventDefault();
    removeActiveClass($('#userSignuptab'));
    removeActiveClass($('#commSignuptab'));
    $('#userSignuptab').addClass('active');
  });

  $('#commSignuptab').on('click', e => {
    e.preventDefault();
    removeActiveClass($('#userSignuptab'));
    removeActiveClass($('#commSignuptab'));
    $('#commSignuptab').addClass('active');
  });

  $('#loginButton').on('click', () => {
    $('#signupModal').removeClass('displayOn');
    $('#signupModal').addClass('displayOff');
    $('#loginModal').removeClass('displayOff');
    $('#loginModal').addClass('displayOn');
  });
  $('#signupButton').on('click', () => {
    $('#signupModal').removeClass('displayOff');
    $('#signupModal').addClass('displayOn');
    $('#loginModal').removeClass('displayOn');
    $('#loginModal').addClass('displayOff');
  });

  $(window).scroll(navbarCollapse);
})(jQuery);
