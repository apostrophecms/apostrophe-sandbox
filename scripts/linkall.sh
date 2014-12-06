#!/bin/sh

# LOOKS SIMPLER DOESN'T IT? UNFORTUNATELY, npm install --link will
# globally install and link modules you never wanted globally installed.
# Holding onto this code in case a way is found to do this with only
# the modules you explicitly npm linked. -Tom






# You probably don't want this! Just use npm install, and later
# npm update to stay up to date with our modules. We use this script
# to "npm link" all of the modules that we maintain so we can do
# active development on them. You must have a ${HOME}/src folder in which
# they may be `git clone`d.

# Load the official list of modules we're maintaining
source scripts/our-modules.source

mkdir -p ${HOME}/src || exit 1

# 1. Clone the modules that aren't already out there

# You can set this script up to clone repositories from an account different than punkave by doing:
# export APOS_GIT=yourgitaccount

if [[ -z "$APOS_GIT" ]]; then
  APOS_GIT="punkave"
fi

echo "Cloning modules not already present from http://github.com/${APOS_GIT}"

for module in "${modules[@]}"
  do
    echo ${module}
    if [ ! -d "${HOME}/src/${module}" ]; then
      ( echo "Checking out ${module} and registering it for npm link" && cd ${HOME}/src && git clone "http://github.com/${APOS_GIT}/${module}" && cd ${module} && npm install ) || exit 1
    fi
    ( cd "${HOME}/src/${module}" && npm link ) || exit 1
  done

echo "Cleaning out node_modules"
rm -rf node_modules
echo "Running npm install --link"
npm install --link
