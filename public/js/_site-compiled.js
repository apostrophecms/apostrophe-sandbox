(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
$(function() {
  require('./demo-header.js');
  require('./off-canvas.js');
});
},{"./demo-header.js":2,"./off-canvas.js":3}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
$(function(){
	var $body = $('body');
	var $trigger = $('.off-canvas-trigger');

	$trigger.on('click', function() {
		$body.toggleClass('show-off-canvas');
		return false;
	});
})
},{}]},{},[1]);
