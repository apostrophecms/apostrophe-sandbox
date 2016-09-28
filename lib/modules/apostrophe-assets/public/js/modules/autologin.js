$(function() {
  if (!$.cookie('demo_modal')) {
    $('.demo-modal').show();
    $.cookie('demo_modal', '1');
    $('body').on('click', '.demo-modal button', function() {
      $('.demo-modal').hide();
      return false;
    });
  }
});
