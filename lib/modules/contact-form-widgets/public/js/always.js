




apos.define('contact-form-widgets', {

  extend: 'apostrophe-widgets',

  construct: function(self, options) {

    self.play = function($widget, data, options) {

      var $form = $widget.find('[data-contact-form]');
      var schema = self.options.submitSchema;
      var piece = _.cloneDeep(self.options.piece);


      console.log('where am i?', schema, data, options);


      
      return apos.schemas.populate($form, self.schema, self.piece, function(err) {
        if (err) {
          alert('A problem occurred setting up the contact form.');
          return;
        }
        enableSubmit();
      });

      function enableSubmit() {
        $form.on('submit', function() {
          submit();
          return false;
        });
      }

      function submit() {
        try {

        return async.series([
          convert,
          submitToServer
        ], function(err) {
          if (err) {
            alert('Something was not right. Please review your submission.');
          } else {
            // Replace the form with its formerly hidden thank you message
            $form.replaceWith($form.find('[data-thank-you]'));
          }
        });
    }
    catch (e) {
      console.log('form error', e);
    }
        function convert(callback) {
          return apos.schemas.convert($form, schema, piece, callback);
        }
        function submitToServer(callback) {
          return self.api('submit', piece, function(data) {
            if (data.status === 'ok') {
              // All is well
              return callback(null);
            }
            // API-level error
            return callback('error');
          }, function(err) {
            // Transport-level error
            return callback(err);
          });
        }
      }

    };
  }
});

var reCaptchaReady = function() {
  console.log('its ready');

        grecaptcha.render('Grecaptcha', {
          'sitekey' : '6LdEEA8UAAAAAB_mOWxPSyUYzSyEWB5it9lsout9'
        });
}