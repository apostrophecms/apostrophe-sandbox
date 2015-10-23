// example of a widget manager with a play method.
// You don't need this file at all if you
// don't need a player.

apos.define('link-widgets', {
  extend: 'apostrophe-widgets',
  construct: function(self, options) {
    self.play = function($widget, data, options) {
      $widget.on('click', function() {
        // TODO this is proc-ing when we click on apos-ui, v annoying
        // alert('now I will take you to ' + data.url);
        return true;
      });
    };
  }
});
