#!/bin/sh

# Update a project with npm link in mind. Use linkall the first time.

echo "Updating top level"
git pull

echo "Updating npm modules with --link option"
npm update --link

echo "Pulling from git for any npm linked modules"
for LINK in $(find node_modules -type l)
do
  (echo "Updating npm linked module $LINK" && cd $LINK && git pull) || exit 1
done

echo "Done!"
