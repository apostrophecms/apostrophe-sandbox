set -e

# -----------------------------------------------------------------------------------
# USAGE: sh scripts/bump.sh <modulename> [version]
# 
# version defaults to 'patch'
# -----------------------------------------------------------------------------------

USAGE="USAGE: sh scripts/bump.sh <modulename> [version]"
remote="origin"

[ ! -d 'node_modules' ] && echo "ERROR: There is no node_modules folder. Are you running from project root?" && exit 1

# We need a module
if [ ! $1 ]; then
  echo $USAGE && exit 1
fi

module=$1
modDir="`pwd`/node_modules/$module"

# That module needs to exist
[ ! -d $modDir ] && echo "ERROR: The directory ($modDir) does not exist" && exit 1

[ $2 ] &&
  version=$2 || version='patch'

cd $modDir
git pull $remote
npm version $version # See https://npmjs.org/doc/version.html
npm publish
git push $remote
git push $remote --tags