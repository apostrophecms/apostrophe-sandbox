// This script bumps the patchlevel version number of the named module, then
// npm publishes it.
//
// You should call it from the level of your main project; the assumption is that
// it is npm linked in node_modules/packagename.
//
// Test your code first. Duh.

var fs = require('fs');
var argv = require('optimist').argv;
var exec = require('child_process').exec;
if (!argv._.length) {
  console.error('Usage: bump modulename');
  process.exit(1);
}
var module = argv._[0];
var modulePackageFilename = 'node_modules/' + module + '/package.json';
var package = JSON.parse(fs.readFileSync(modulePackageFilename));
var version = package.version;
console.log(version);
var versions = version.split('.');
console.log(versions);
if (versions.length !== 3) {
  console.error('I only understand three-part version numbers: x.y.z.');
  process.exit(1);
}
versions[2]++;
version = versions.join('.');
console.log(version);
package.version = version;
fs.writeFileSync(modulePackageFilename, JSON.stringify(package, undefined, 2));
exec('cd node_modules/' + module + ' && git add -A . && git commit -m ' + version + ' && git pull && git push && npm publish', function(err, stdout, stderr) {
  if (err) {
    console.error(err);
    console.error(stderr);
  } else {
    console.log('Done.');
  }
});


