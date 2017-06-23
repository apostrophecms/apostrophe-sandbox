require('shelljs/global');

var i;

var root = __dirname + '/..';

for (i = 0; (i < 10); i++) {
  var uploads = root + '/public/uploads/' + i;
  rm('-rf', uploads);
}
rm('-rf', root + '/public/original-uploads');
cp('-R', root + '/public/uploads', root + '/public/original-uploads');

for (i = 0; (i < 10); i++) {
  console.log('copying');
  var uploads = root + '/public/uploads/' + i;
  cp('-R', root + '/public/original-uploads', uploads);
}

exit(exec('mongo ' + __dirname + '/reset-multi-demo-mongodb.js'));

