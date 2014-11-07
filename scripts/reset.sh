#!/bin/sh
KEEP_PAGES=(default.html home.html insufficient.html notfound.html)
REMOVE_MODULES=(apostrophe-map apostrophe-twitter)

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_DIR=$DIR/..
pushd $PROJECT_DIR

# clear out public assets
rm -rf ./.git
rm -f ./public/images/*
rm -f $(find ./public/css/ -type f | grep -v site.less)
rm -rf ./public/modules/*
rm -f ./uploads/files/*

# clear out views
grepstring=""
for page in "${KEEP_PAGES[@]}"; do
  grepstring="${grepstring}\\|${page}"
  echo $grepstring
done

# remove unnecessary npm modules
for module in "${REMOVE_MODULES[@]}"; do
  npm uninstall --save $module
done

popd $PROJECT_DIR