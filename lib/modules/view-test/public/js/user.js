apos.define('view-test', {
  extend: 'apostrophe-context',
  construct: function(self, options) {
    $('body').on('click', '[data-view-test]', function() {
      apos.create('view-test-modal', {});
    });

    apos.define('view-test-view', {
      extend: 'apostrophe-modal',
      action: self.action,
      view: '.view-test-view',
      source: 'view',
      construct: function(self,options) {
        self.beforeSave = function(callback) {
          apos.log('view given chance to save');
          return setImmediate(callback);
        };
        self.afterHide = function(callback) {
          apos.log('view given chance to hide');
          return setImmediate(callback);
        }
        self.beforeCancel = function(callback) {
          apos.log('view given chance to cancel');
          return setImmediate(callback);
        };
      }
    });

    apos.define('view-test-modal', {
      extend: 'apostrophe-modal',
      action: self.action,
      view: '.view-test-modal',
      source: 'modal',
      construct: function(self, options) {
        self.beforeShow = function(callback) {
          apos.create('view-test-view', { $view: self.$el.find('[data-test-view]') });
          return setImmediate(callback);
        };
        self.beforeSave = function(callback) {
          apos.log('modal given chance to save');
          return setImmediate(callback);
        }
        self.beforeCancel = function(callback) {
          apos.log('modal given chance to cancel');
          return setImmediate(callback);
        }
        self.afterHide = function(callback) {
          apos.log('modal given chance to hide');
          return setImmediate(callback);
        }
      }
    });

  }
});
