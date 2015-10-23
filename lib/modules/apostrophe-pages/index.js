module.exports = {
  construct: function(self, options) {
    
    self.pushAsset('stylesheet', 'styleguide', { when: 'always' });
  }
};
