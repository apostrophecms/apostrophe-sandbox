var apos = require('apostrophe')({
  afterInit: function(callback) {
    console.log('apos.assets is:');
    console.log(apos.assets);
  }
});
