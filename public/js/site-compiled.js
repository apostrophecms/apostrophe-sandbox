(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// SITE

// this file is compiled down to public/js/site-compiled.js and added as a static asset via A2.

require('./fancy');

},{"./fancy":2}],2:[function(require,module,exports){
// Truly site-specific JS
//
// YOU SHOULD USE .on ON THE BODY, to avoid problems recognizing events
// on elements added later. Example:
//
// RIGHT
//
// // I work with content added later
// $(function() {
//   $('body').on('click', '.my-selector', function() { ... })
// }
//
// WRONG
//
// // I won't work with content added dynamically!
// $(function() {
//   $('.my-selector').click(function() { ... })
// });
//
// If this doesn't work for your needs, listen for the 'aposReady'
// event on the body element, and update your event handlers on other
// elements whenever your receive it, taking care NOT to double-bind.
// Use jQuery's $.data to figure out if you've bound this element already.
//
// Example:
//
// $('body').on('aposReady', function() {
//   $('.my-fancy-things').each(function() {
//     var $thing = $(this);
//     if (!$thing.data('aposLive')) {
//       $thing.data('aposLive', true);
//       // Do stuff with $thing that's so amazing you can't do it with
//       // event handlers on 'body' filtered by a selector
//     }
//   });
// });

$(function() {
});

},{}]},{},[1])