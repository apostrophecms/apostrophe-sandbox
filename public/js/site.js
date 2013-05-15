// Truly site-specific JS

$(function() {
  // TODO: refactor these into the apostrophe module
  $('.apos-accordion-title').click(function(event){
    $(this).parent().find('.apos-accordion-items').toggleClass('open');
  });

  $('.apos-preview-toggle').click(function(event){
    $('.apos-preview-toggle').toggleClass('previewing');
    $('body').toggleClass('previewing');
  });
});


function MyBlog(optionsArg) {
  var self = this;
  var options = {
    instance: 'blogPost',
    name: 'blog'
  };
  $.extend(options, optionsArg);
  AposSnippets.call(self, options);

  function findExtraFields($el, data, callback) {
    data.publicationDate = $el.find('[name="publication-date"]').val();
    data.publicationTime = $el.find('[name="publication-time"]').val();

    callback();
  }

  self.afterPopulatingEditor = function($el, snippet, callback) {
    $el.find('[name="publication-date"]').val(snippet.publicationDate);
    $el.find('[name="publication-time"]').val(snippet.publicationTime);

    $(function() {
      $el.find('[name="publication-date"]').datepicker({
        defaultDate: "+0w",
        changeMonth: true,
        numberOfMonths: 1,
        onClose: function( selectedDate ) {
          console.log(selectedDate);
          $el.find('[name="publication-date"]').datepicker( "option", "minDate", selectedDate );
        }
      });
    });

    callback();
  };

  self.addingToManager = function($el, $snippet, snippet) {
    $snippet.find('[data-date]').text(snippet.publicationDate);
    if (snippet.tags !== null) {
      $snippet.find('[data-tags]').text(snippet.tags);
    }
  };

  self.beforeInsert = function($el, data, callback) {
    findExtraFields($el, data, callback);
  };

  self.beforeUpdate = function($el, data, callback) {
    findExtraFields($el, data, callback);
  };
}

MyBlog.addWidgetType = function(options) {
  if (!options) {
    options = {};
  }
  _.defaults(options, {
    name: 'blog',
    label: 'Blog Posts',
    action: '/apos-blog',
    defaultLimit: 5
  });
  AposSnippets.addWidgetType(options);
};

