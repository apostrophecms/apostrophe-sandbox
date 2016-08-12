// Settings specific to this server. Change the URL
// if you are deploying in production. Then copy to
// data/local.js. That folder is shared by all
// deployments in our stagecoach recipe

module.exports = {

  // Absolute URL is only necessary with s3
  // uploadsUrl: '/uploads',

  // 'locals' are visible to nunjucks templates
  locals: {
    // Warning not to edit content with an expectation of keeping it on this server, for staging servers
    doNotEdit: false,
    // offline: true means the site should work with no external
    // websites available, not even google fonts or google maps. This
    // doesn't miraculously make those things work locally, it just
    // stops loading them so you can debug other things while offline.
    offline: false,
    // demo: true means features that don't look polished yet shouldn't
    // be activated. Also shows the Apostrophe bar and login link at all times
    demo: false,
    // Show the Apostrophe admin bar and login button at all times.
    // You'll probably want to change this to `false` later and create
    // your own suitably styled links to `/login` if desired
    loginButton: true
  },

  // Set to true for full CSS and JS minify, on staging and production servers
  minify: false,
  // If these are your db settings then you don't need to be explicit. If not
  // you can uncomment this and get more specific.
  db: {
    uri: 'mongodb://localhost:27017/apostrophe-sandbox'
    // There is legacy support for host, port, name, user and password options,
    // but this is not necessary. They can all go in the uri option like this:
    // mongodb://user:password@host:port/dbname
  }
};
