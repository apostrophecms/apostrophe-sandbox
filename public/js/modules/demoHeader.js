$(function(){
	var $header = $('.demo-header');
	var $body = $('body');
	var $window = $(window);

	$header.on('click', function(){
		$body.toggleClass('collapse-header');
	});

	if ($window.width() < 790) {
		$body.addClass('collapse-header');
	}

})