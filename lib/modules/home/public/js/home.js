apos.define('home', {
  beforeConstruct: function(self, options) {
    self.options = options;
  },
  afterConstruct: function(self) {
    $('body').on('click', '[data-launch-test-modal]', function() {
      apos.create("modal-test", self.options, function(err) {});
    });
  }
});


