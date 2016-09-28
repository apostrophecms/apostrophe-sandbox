module.exports = {
  construct: function(self, options) {
    console.error('\n*** DANGER! *** YOU HAVE THE demo-autologin MODULE ENABLED!\n');
    console.error('If you are not us, or running a public demo to which EVERYBODY');
    console.error('should be INSTANTLY logged in AS ADMIN, remove the demo-autologin');
    console.error('module folder and remove it from app.js too.');
    console.error('');
    console.error('(By the way, next time use the apostrophe-cli to make a much cleaner,');
    console.error('smaller new project. Forking this sandbox is the hard way!)\n');
    self.pageBeforeSend = function(req, callback) {
      if (!req.cookies.demo_autologin) {
        return self.apos.users.find({ username: 'admin' }).permission(false).toObject(function(err, user) {
          if (err) {
            return callback(err);
          }
          if (!user) {
            return callback(null);
          }
          req.login(user, function(err) {
            if (err) {
              return callback(err);
            }
            // Start a whole new request, but logged in. After this they
            // have the cookie so they can log out and back in normally if they want
            req.res.cookie('demo_autologin', 1);
            return req.res.redirect('/');
          });
        });
      }
      return callback(null);
    };
  }
};
