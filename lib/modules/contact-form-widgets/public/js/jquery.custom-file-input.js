/*
	By Osvaldas Valutis, www.osvaldas.info
	Available for use under the MIT License
*/

'use strict';

;( function( $, window, document, undefined )
{
	$( '.file-input' ).each( function()
	{
		var $input	 = $('[type=file]', this ),
			$label	 = $( 'label', this ),
			$output = $('.file-path',  this);

		$input.on( 'change', function( e )
		{
			var fileName = '';

			if( $input.files && input.files.length > 1 )
				fileName = false
			else if( e.target.value )
				fileName = e.target.value.split( '\\' ).pop();

			$output.val( fileName );
			
		});

		// Firefox bug fix
		$input
		.on( 'focus', function(){ $input.addClass( 'has-focus' ); })
		.on( 'blur', function(){ $input.removeClass( 'has-focus' ); });
	});
})( jQuery, window, document );