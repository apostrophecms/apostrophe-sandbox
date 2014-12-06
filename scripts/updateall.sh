#!/bin/sh

# LOOKS SIMPLER DOESN'T IT? UNFORTUNATELY, npm install --link will
# globally install and link modules you never wanted globally installed.
# Holding onto this code in case a way is found to do this with only
# the modules you explicitly npm linked. -Tom





# You probably don't want this! Just use npm install, and later
# npm update to stay up to date with our modules. We use this script
# to update all of the modules we have "npm link"ed in the project
# because we are actively developing them.

# Update main project so we know about any changes to dependencies
git pull

# Link everything, in case there are new modules to link. Also does a
# fresh npm install of everything else, which turns out to be faster
# than our old piecemal approach
sh scripts/linkall.sh

# Load the official list of modules we're maintaining
source scripts/our-modules.source

echo "git pulling modules"

for module in "${modules[@]}"
  do
    echo ${module}
    if [ ! -d "${HOME}/src/${module}" ]; then
      ( echo "git pulling ${module}" && cd ${HOME}/src/${module} && git pull && npm install ) || exit 1
    fi
  done
