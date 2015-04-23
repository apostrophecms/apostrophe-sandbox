// example of a widget manager with a play method.
// You don't need this file at all if you
// don't need a player.

apos.define('link-widgets', {
  extend: 'apostrophe-widgets',
  construct: function(self, options) {
    self.play = function($widget, data, options) {
      $widget.on('click', function() {
        alert('now I will take you to ' + data.url);
        return true;
      });
    };
  }
});
