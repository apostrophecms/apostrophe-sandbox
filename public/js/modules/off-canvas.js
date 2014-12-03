$(function(){
	var $body = $('body');
	var $trigger = $('.off-canvas-trigger');

	$trigger.on('click', function() {
		$body.toggleClass('show-off-canvas');
		return false;
	});
})