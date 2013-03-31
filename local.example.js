// Settings specific to this server. Change the URL
// if you are deploying in production. Then copy to
// data/local.js. That folder is shared by all
// deployments in our stagecoach recipe

module.exports = {
  // Set as appropriate to the host domain
  uploadsUrl: 'http://localhost:3000/uploads',
  locals: {
    // Warning not to edit content with an expectation of keeping it on this server, for staging servers
    doNotEdit: false
  },
  // Set to true for full CSS and JS minify, on staging and production servers
  minify: false
};


