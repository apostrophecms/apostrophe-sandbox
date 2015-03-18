apos.define('modal-test', {
  extend: 'apostrophe-modal',
  source: 'modal-test',
  construct: function(self, options) {
    self.next = function() {
      apos.create('modal-test', options, function(err) {
      });
    };
    self.save = function(callback) {
      console.log('saving');
      return callback(null);
    };
    self.beforeShow = function(callback) {
      self.$el.on('click', '[data-launch-submodal]', function() {
        apos.create('modal-test', options, function(err) {
      });
        return false;
      });
      return setImmediate(callback);
    };
  }
});
