$(function(){
	var $body = $('body');
	var $trigger = $('.off-canvas-trigger');
	var $close = $('.demo-nav-close');

	$trigger.on('click', function() {
		console.log('yo');
		$body.toggleClass('show-off-canvas');
		return false;
	});

	$close.on('click', function() {
		console.log('word');
		$body.toggleClass('show-off-canvas');
		return false;
	});
});
