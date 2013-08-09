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

// Subclass the editor to add functionality

var SuperEditor = apos.Editor;
function MyEditor(options) {
  apos.log('constructed');
  var self = this;
  SuperEditor.call(this, options);
  var superEnableControls = self.enableControls;
  self.enableControls = function() {
    superEnableControls.call(this);
    apos.log('enabling control');
    self.enableControl('insertHorizontalRule', {
      keys: ['meta+h', 'ctrl+h'],
      callback: self.green
    });
  };
}

// Install our subclass as the official editor
apos.Editor = MyEditor;

$(function() {
  // Your code goes here
});

