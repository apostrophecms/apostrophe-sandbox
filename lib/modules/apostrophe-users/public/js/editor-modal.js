apos.define('apostrophe-users-editor-modal', {
  construct: function(self, options) {
    var superBeforePopulate = self.beforePopulate;
    self.beforePopulate = function(piece, callback) {
      if (piece.username === 'admin') {
        alert('Editing the admin account has been blocked, just for the demo. Try making other accounts and editing them. Thanks!');
        return callback(new Error('Reserved'));
      }
      return superBeforePopulate(piece, callback);
    };
  }
});
