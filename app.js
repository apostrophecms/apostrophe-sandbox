var apos = require('apostrophe')({
  shortName: 'sandbox',
  hostName: 'sandbox',
  afterInit: function(callback) {
    console.log('apos.assets is:');
    console.log(apos.assets);
    return setImmediate(callback);
  }
});
