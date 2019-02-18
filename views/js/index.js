$('.tab a').on('click', function(e) {
  e.preventDefault();

  $(this)
    .parent()
    .addClass('active');
  $(this)
    .parent()
    .siblings()
    .removeClass('active');

  target = $(this).attr('href');

  $('.tab-content > div')
    .not(target)
    .hide();

  $(target).fadeIn(600);

  if (target == '#signup' && $('#comm').is(':visible')) {
    $('#comm').hide();
    $('#user').fadeIn(600);
  } else if ($('#user').is(':visible')) {
    $('#user').hide();
    $('#comm').fadeIn(600);
  }
});
