// Replace the generic type objects from the server with versions that
// offer custom page settings, etc. Make sure we wait for domready so
// we go after the initialization of the pages module

$(function() {
  aposPages.replaceType('snippets', new AposSnippets());
  AposSnippets.addWidgetType();
  aposPages.replaceType('blog', new AposBlog());
  AposBlog.addWidgetType();
  aposPages.replaceType('map', new AposMap());
  AposMap.addWidgetType();
});
