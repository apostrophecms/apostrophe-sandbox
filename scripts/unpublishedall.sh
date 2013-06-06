#!/bin/sh

echo "Searching for linked npm modules with unpublished changes."
for LINK in $(find node_modules -depth 1 -type l)
do
  sh scripts/unpublishedone.sh $LINK
done
echo "Done."

