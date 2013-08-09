# Apostrophe Sandbox Custom Control Branch

This is a branch of the Apostrophe sandbox intended to demonstrate how to subclass the editor and add a custom control. This particular custom control relies on a standard feature of execCommand, but you can also provide a callback option when calling self.enableControl, in which case your callback is responsible for manipulating the DOM at the current selection. See linkEditor in `editor.js` for examples of that.

Most developers should be looking at the [main Apostrophe sandbox](http://github.com/punkave/apostrophe-sandbox), not this branch.

Questions should go to the [apostrophenow Google Group](https://groups.google.com/forum/?fromgroups#!forum/apostrophenow).

## Thanks for using Apostrophe!

(http://punkave.com)[P'unk Avenue]

