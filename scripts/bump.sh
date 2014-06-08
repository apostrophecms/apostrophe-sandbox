#!/bin/sh

(
  cd ~/src/$1 &&
  # Get current branch name so we can make sure it's master
  # http://stackoverflow.com/questions/6245570/get-current-branch-name
  branch=`git rev-parse --abbrev-ref HEAD`
  if [ "master" != "$branch" ]; then
    echo "Not on the master branch!"
    exit 1
  fi
  npm version patch &&
  git push &&
  npm publish &&
  echo "Done."
)
