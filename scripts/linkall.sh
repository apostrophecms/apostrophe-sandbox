#!/bin/sh

set -e

# You probably don't want this! Just use npm install, and later
# npm update to stay up to date with our modules. We use this script
# to "npm link" all of the modules that we maintain so we can do
# active development on them. You must have a ${HOME}/src folder in which
# they may be `git clone`d.

grep -q '"apostrophe": "' package.json || (echo "\nThis project doesn't seem to depend on apostrophe, are you in the right directory?\n" && exit 1)

# Load the official list of modules we're maintaining
source scripts/our-modules.source

projectPath=`pwd`
project=`basename $projectPath`
aposDir=${HOME}/src/apostrophe

mkdir -p $aposDir

echo ""
echo "Preparing $projectPath for development"
echo ""

for module in "${modules[@]}"; do
  modDir="$aposDir/$module"

  # Checkout the module if it hasn't been setup yet
  [ ! -d $modDir ] && (
    echo "Checking out $module into $modDir"
    git clone -q "git@github.com:punkave/$module.git" $modDir
  )

  echo "\n --> Setting up $module in $project\n"
  npm link $modDir --silent # Global & local links and install deps

done