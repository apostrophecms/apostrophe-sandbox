#!/bin/sh

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

# 2. Establish npm links *between* modules that depend on each other

echo "Establishing npm links *between* modules"

for module in "${modules[@]}"
  do
    for submodule in "${modules[@]}"
      do
        mdir="${HOME}/src/${module}"
        # If the module is currently a subdir of another module make it a link instead
        if [ -d "${mdir}/node_modules/${submodule}" ]; then
          ( echo "Sub-linking ${submodule} for ${module}" && cd $mdir && npm link ${submodule} ) || exit 1
        fi
      done
  done

# 3. npm link from the project

echo "Establishing npm links in the *project*"

for module in "${modules[@]}"
  do
    if [ ! -h "node_modules/${module}" ]; then
      ( echo "Linking ${module}" && npm link ${module} ) || exit 1
    fi
  done
