module.exports = {
  beforeConstruct: function(self, options) {
    options.addFields = [
      {
        name: 'approvedByBob',
        label: 'Approved by Bob',
        type: 'boolean'
      }
    ]
  }
};

