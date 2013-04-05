// Truly site-specific JS

$(function() {
  // TODO: refactor these into the apostrophe module
  $('.apos-accordion-title').click(function(event){
    $(this).parent().find('.apos-accordion-items').toggleClass('open');
  });

  $('.apos-preview-toggle').click(function(event){
    $('.apos-preview-toggle').toggleClass('previewing');
    $('body').toggleClass('previewing');
  });
});
