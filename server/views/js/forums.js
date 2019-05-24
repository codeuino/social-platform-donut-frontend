(function($) {
  'use strict';

  /* ------------------------------------------------------------------------- *
   * COMMON VARIABLES
   * ------------------------------------------------------------------------- */
  var $wn = $(window),
    $document = $(document),
    $body = $('body');

  /* ------------------------------------------------------------------------- *
   * CHECK DATA
   * ------------------------------------------------------------------------- */
  var checkData = function (data, value) {
    return typeof data === 'undefined' ? value : data;
  };

  $(function () {
    /* ------------------------------------------------------------------------- *
     * BACKGROUND IMAGE
     * ------------------------------------------------------------------------- */
    var $bgImg = $('[data-bg-img]');

    $bgImg.css('background-image', function () {
      return 'url("' + $(this).data('bg-img') + '")';
    }).addClass('bg--img').removeAttr('data-bg-img').attr('data-rjs', 2);

    /* ------------------------------------------------------------------------- *
     * TOOLTIP
     * ------------------------------------------------------------------------- */
    var $tooltip = $('[data-toggle="tooltip"]');

    if ( $tooltip.length ) {
      $tooltip.tooltip();
    }

    /* ------------------------------------------------------------------------- *
     * STICKY
     * ------------------------------------------------------------------------- */
    var $sticky = $('[data-trigger="sticky"]');

    $sticky.each(function () {
      $sticky.sticky({
        zIndex: 999
      });
    });

    /* ------------------------------------------------------------------------- *
     * COUNTER UP
     * ------------------------------------------------------------------------- */
    var $counterUp = $('[data-trigger="counterup"]');

    if ( $counterUp.length ) {
      $counterUp.counterUp({
        delay: 10,
        time: 1000
      });
    }

    /* ------------------------------------------------------------------------- *
     * SELECT MENU
     * ------------------------------------------------------------------------- */
    var $selectmenu = $('[data-trigger="selectmenu"]');

    if ( $selectmenu.length ) {
      $selectmenu.customSelectMenu();
    }

    /* ------------------------------------------------------------------------- *
     * FORM VALIDATION
     * ------------------------------------------------------------------------- */
    var $formValidation = $('[data-form="validate"] form');

    $formValidation.each(function () {
      var $t = $(this);

      $t.validate({
        errorPlacement: function () {
          return true;
        }
      });
    });

    /* ------------------------------------------------------------------------- *
     * AJAX FORM
     * ------------------------------------------------------------------------- */
    var $ajaxForm = $('[data-form="ajax"] form');

    $ajaxForm.each(function () {
      var $form = $(this),
        $formStatus = $form.find('.status');

      $form.validate({
        errorPlacement: function () {
          return true;
        },
        submitHandler: function (el) {
          var $form = $(el),
            formUrl = $form.attr('action'),
            formData = $form.serialize();

          $.post(formUrl, formData, function (res) {
            $formStatus.show().html(res).delay(6000).fadeOut('show');
          });
        }
      });
    });

    /* ------------------------------------------------------------------------- *
     * POPUP
     * ------------------------------------------------------------------------- */
    var $videoPopup = $('[data-trigger="video_popup"]');

    if ( $videoPopup.length ) {
      $videoPopup.magnificPopup({
        type: 'iframe',
        iframe: {
          patterns: {
            youtube: {
              src: '//www.youtube.com/embed/%id%?autoplay=1&amp;rel=0&amp;fs=1&amp;loop=1'
            }
          }
        }
      });
    }

    var $galleryPopup = $('[data-trigger="gallery_popup"]');

    if ( $galleryPopup.length ) {
      $galleryPopup.magnificPopup({
        delegate: 'a',
        type: 'image',
        mainClass: 'mfp-no-margins mfp-with-zoom',
        gallery: {
          enabled: true
        },
        zoom: {
          enabled: true
        }
      });
    }

    /* ------------------------------------------------------------------------- *
     * ZOOM IMAGE
     * ------------------------------------------------------------------------- */
    var $zoomImg = $('[data-trigger="zoom"]');

    if ( $zoomImg.length ) {
      $zoomImg.zoom();
    }

    /* -------------------------------------------------------------------------*
     * COUNTDOWN
     * -------------------------------------------------------------------------*/
    var $countDown = $('[data-countdown]');

    $countDown.each(function () {
      var $t = $(this);

      $t.countdown($t.data('countdown'), function(e) {
        $(this).html( '<ul>' + e.strftime('<li><strong>%D</strong><span>DAYS</span></li><li><strong>%H</strong><span>HOURS</span></li><li><strong>%M</strong><span>MINUTES</span></li><li><strong>%S</strong><span>SECONDS</span></li>') + '</ul>' );
      });
    });

    /* ------------------------------------------------------------------------- *
     * SMOOTH SCROLL
     * ------------------------------------------------------------------------- */
    var $smoothScroll = $('[data-trigger="smoothScroll"]');

    $smoothScroll.on('click', function (e) {
      e.preventDefault();

      e.$el = $(this);
      e.$target = this.hash;

      $('html, body').animate({
        scrollTop: $(e.$target).offset().top - 60
      }, 1200);
    });

    /* ------------------------------------------------------------------------- *
     * OWL CAROUSEL
     * ------------------------------------------------------------------------- */
    var $owlCarousel = $('.owl-carousel');

    $owlCarousel.each(function () {
      var $t = $(this);

      $t.owlCarousel({
        items: checkData( $t.data('owl-items'), 1 ),
        margin: checkData( $t.data('owl-margin'), 0 ),
        loop: checkData( $t.data('owl-loop'), true ),
        smartSpeed: 2500,
        autoplay: checkData( $t.data('owl-autoplay'), true ),
        autoplayTimeout: checkData( $t.data('owl-speed'), 8000 ),
        center: checkData( $t.data('owl-center'), false ),
        animateOut: checkData( $t.data('owl-animate'), false ),
        nav: checkData( $t.data('owl-nav'), false ),
        navText: ['<i class="fa fa-caret-left"></i>', '<i class="fa fa-caret-right"></i>'],
        dots: checkData( $t.data('owl-dots'), false ),
        responsive: checkData( $t.data('owl-responsive'), {} )
      }).addClass( 'owl-dots--' + checkData( $t.data('owl-dots-style'), '1' ) );
    });

    /* ------------------------------------------------------------------------- *
     * PANEL GROUP
     * ------------------------------------------------------------------------- */
    var $panelOpen = $('[data-keep-panel="open"]');

    $panelOpen.on('click', '[data-toggle="collapse"]', function (e) {
      if ( !$(this).hasClass('collapsed') ) {
        e.stopPropagation();
      }
    });

    /* ------------------------------------------------------------------------- *
     * BOX CONTROLS
     * ------------------------------------------------------------------------- */
    var $boxControls = $('.box--controls');

    if ( $boxControls.length ) {
      $boxControls.on('click', '[data-action]', function (e) {
        e.preventDefault();
        e.$el = $(this);
        e.$siblingOwl = e.$el.parent().siblings('.owl-carousel');

        if ( e.$siblingOwl.length ) e.$siblingOwl.trigger( e.$el.data('action') + '.owl.carousel' );
      });
    }

    /* ------------------------------------------------------------------------- *
     * MEDIA VIDEO
     * ------------------------------------------------------------------------- */
    var $mediaVideoModal = $('.media--modal.type--video');

    $mediaVideoModal.on('hidden.bs.modal', function () {
      var $t = $(this),
        $iframe = $t.find('.media--video iframe'),
        value = $t.find('iframe').attr('src');

      $iframe.attr('src', value + '&c=0');
    });

    /* ------------------------------------------------------------------------- *
     * FAQ ITEM
     * ------------------------------------------------------------------------- */
    var $faqItem2 = $('.faq--item.style--2');

    $faqItem2
      .on('show.bs.collapse', '.content', function () {
        $(this).parents('.faq--item').addClass('opened');
      }).on('hide.bs.collapse', '.content', function () {
        $(this).parents('.faq--item').removeClass('opened');
      });

    /* ------------------------------------------------------------------------- *
     * MAP
     * ------------------------------------------------------------------------- */
    var $map = $('[data-trigger="map"]'),
      $mapOps;

    if ( $map.length ) {
      // Map Options
      $mapOps = $map.data('map-options');

      // Map Initialization
      window.initMap = function () {
        $map.css('min-height', '400px');

        $map.each(function () {
          var $t = $(this), map, lat, lng, zoom;

          $mapOps = $t.data('map-options');
          lat = parseFloat($mapOps.latitude, 10);
          lng = parseFloat($mapOps.longitude, 10);
          zoom = parseFloat($mapOps.zoom, 10);

          map = new google.maps.Map($t[0], {
            center: {lat: lat, lng: lng},
            zoom: zoom,
            scrollwheel: false,
            disableDefaultUI: true,
            styles: [{'featureType':'administrative','elementType':'labels.text.fill','stylers':[{'color':'#444444'}]},{'featureType':'landscape','elementType':'all','stylers':[{'color':'#f2f2f2'}]},{'featureType':'poi','elementType':'all','stylers':[{'visibility':'off'}]},{'featureType':'road','elementType':'all','stylers':[{'saturation':-100},{'lightness':45}]},{'featureType':'road.highway','elementType':'all','stylers':[{'visibility':'simplified'}]},{'featureType':'road.arterial','elementType':'labels.icon','stylers':[{'visibility':'off'}]},{'featureType':'transit','elementType':'all','stylers':[{'visibility':'off'}]},{'featureType':'water','elementType':'all','stylers':[{'color':'#46bcec'},{'visibility':'on'}]}],
            zoomControl: true
          });

          new google.maps.Marker({
            position: {lat: lat, lng: lng},
            map: map,
            animation: google.maps.Animation.DROP,
            draggable: true
          });
        });
      };

      // Map Script
      var googleAPI = document.createElement('script');

      googleAPI.type = 'text/javascript';
      googleAPI.src = 'https://maps.googleapis.com/maps/api/js?key='+ $mapOps.api_key +'&callback=initMap';

      $body.append( googleAPI );
    }

    var $map = $('[data-trigger="map"]');

    /* ------------------------------------------------------------------------- *
     * REVIEW RATING
     * ------------------------------------------------------------------------- */
    var $reviewRating = $('.review--rating');

    $reviewRating .on('click', 'label', function () {
      var $t = $(this);

      $t.parent('.stars').attr( 'data-selected', $t.children('input').val() );
    });

    /* ------------------------------------------------------------------------- *
     * CART WIDGET
     * ------------------------------------------------------------------------- */
    var $cartWidget = $('.cart--widget');

    $cartWidget.on('click', '.remove', function (e) {
      e.preventDefault();

      e.$el = $(this);
      e.$parent = e.$el.parent('li');

      e.$el.fadeOut(function () {
        if ( e.$parent.index() === 0 && e.$parent.next().length === 0 ) {
          e.$parent.html('<p>No products in the cart.</p>');
        } else {
          e.$parent.remove();
        }
      });
    });

    /* ------------------------------------------------------------------------- *
     * HEADER SECTION
     * ------------------------------------------------------------------------- */
    var $header = $('.header--section'),
      $headerNavbar = $('.header--navbar'),
      $headerSearch2 = $('.header--search.style--2');

    $headerSearch2.on('click', 'button', function (e) {
      var $parent = $(this).parents('.header--search');

      if ( !$parent.hasClass('open') ) {
        e.preventDefault();
        $parent.addClass('open');
      }

      setTimeout(function () {
        $document.on('click.hs', function (e) {
          e.$target = $( e.target );

          if ( e.$target.not('.header--search').length === 0 || e.$target.parents('.header--search').length === 0 ) {
          ) {
            $parent.removeClass('open');
            $document.off('click.hs');
          }
        });
      }, 200);
    });

    /* ------------------------------------------------------------------------- *
     * BANNER SECTION
     * ------------------------------------------------------------------------- */
    var $bannerSlider = $('.banner--slider'),
      bannerSliderFull = function (onresize) {
        $bannerSlider.css('height', function (wn, bs) {
          wn = $wn.outerHeight() - $header.outerHeight(); // Window Height without Header
          bs = parseInt( bs, 10 ); // Banner Slider Height

          return wn > bs ? wn : bs;
        });

        if (!onresize) $bannerSlider.owlCarousel('refresh');
      };

    bannerSliderFull(0);
    $wn.on('resize', bannerSliderFull);

    /* ------------------------------------------------------------------------- *
     * COMING SOON SECTION
     * ------------------------------------------------------------------------- */
    var $cs = $('.coming-soon--section');

    if ( $cs.length ) {
      $cs.css('min-height', function () {
        return $cs.find('.cs--content').outerHeight();
      });
    }

    /* ------------------------------------------------------------------------- *
     * 404 SECTION
     * ------------------------------------------------------------------------- */
    var $f0f = $('.f0f--section');

    if ( $f0f.length ) {
      $f0f.css('min-height', function () {
        return $f0f.find('.f0f--content').outerHeight();
      });
    }

    /* ------------------------------------------------------------------------- *
     * BACK TO TOP BUTTON
     * ------------------------------------------------------------------------- */
    var $backToTop = $('#backToTop');

    $backToTop.on('click', 'a', function (e) {
      e.preventDefault();

      $('html, body').animate({
        scrollTop: 0
      }, 1200);
    });
  });
  });
  $wn.on('load', function () {
    /* ------------------------------------------------------------------------- *
     * BODY SCROLLING
     * ------------------------------------------------------------------------- */
    var isBodyScrolling = function () {
      if ( $wn.scrollTop() > 1 ) {
        $body.addClass('isScrolling');
      } else {
        $body.removeClass('isScrolling');
      }
    };

    isBodyScrolling();
    $wn.on('scroll', isBodyScrolling);

    /* ------------------------------------------------------------------------- *
     * ADJUST ROW
     * ------------------------------------------------------------------------- */
    var $adjustRow = $('.AdjustRow');

    if ( $adjustRow.length ) {
      $adjustRow.isotope({
        layoutMode: 'fitRows'
      });
    }

    /* ------------------------------------------------------------------------- *
     * Masonry ROW
     * ------------------------------------------------------------------------- */
    var $masonryRow = $('.MasonryRow');

    if ( $masonryRow.length ) {
      $masonryRow.isotope();
    }

    /* ------------------------------------------------------------------------- *
     * HEADER SECTION
     * ------------------------------------------------------------------------- */
    var $headerNavbar = $('.header--navbar');

    var $el = $('.buddy-finder--widget').siblings('.widget--title');

    $el.on('click', function () {
      var $t = $(this);

      if ( $t.hasClass('selected') ) $t.attr('contenteditable', 'true').focus();
      if ( !$t.hasClass('selected') ) $t.addClass('selected');

      setTimeout(function () {
        $(document).on('click', function (e) {
          if ( $(e.target).not('.widget--title.selected').length === 1 ) { $t.removeClass('selected'); $t.removeAttr('contenteditable', 'true'); }
        });
      }, 200);
    });

    /* ------------------------------------------------------------------------- *
     * STICKY CONTENT
     * ------------------------------------------------------------------------- */
    var $stickyScroll = $('[data-trigger="stickyScroll"]');

    if ( $stickyScroll.length ) {
      $stickyScroll.theiaStickySidebar({
        additionalMarginTop: $headerNavbar.length ? $headerNavbar.outerHeight() + 40 : 40
      });
    }

    /* ------------------------------------------------------------------------- *
     * PRELOADER
     * ------------------------------------------------------------------------- */
    var $preloader = $('#preloader');

    if ( $preloader.length ) {
      $preloader.fadeOut('slow');
    }

    /* ------------------------------------------------------------------------- *
     * SCROLLING ANIMATIONS
     * ------------------------------------------------------------------------- */
    var $scrollRevealGroup = $('[data-scroll-reveal="group"]'),
      scrollReveal = '';

    if ( typeof ScrollReveal === 'function' ) {
      scrollReveal = ScrollReveal();

      scrollReveal
        .reveal('[data-scroll-reveal="left"]', {origin: 'left', mobile: false, duration: 800})
        .reveal('[data-scroll-reveal="right"]', {origin: 'right', mobile: false, duration: 800})
        .reveal('[data-scroll-reveal="bottom"]', {duration: 800});

      $scrollRevealGroup.each(function () {
        scrollReveal.reveal($(this).children(), {duration: 800}, 150);
      });
    }
  });
/*eslint-disable */
})(jQuery);
/*eslint-enable */