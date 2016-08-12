#!/bin/sh

# Update the project. If we have no npm linked modules then this is simple. If we are using npm link, then
# we have extra logic to update those modules without triggering bugs in npm that cause failures when
# modules have been npm linked to each other. -Tom

WAS_LINKED=`find node_modules -depth 1 -type l | wc -l`

if [ $WAS_LINKED -ne 0 ]; then
  echo "This project has npm links, taking extra precautions."
  echo "Breaking any nested npm links so that npm update doesn't fail (I will put them back later)"
  for MODULE in $(find node_modules -depth 1 -type l)
  do
    MODULE=`basename $MODULE`
    for LINK in $(find ~/src/$MODULE/node_modules -depth 1 -type l)
    do
      (echo "Removing nested link $LINK" && rm $LINK) || exit 1
    done
  done

  echo "Updating any top-level npm linked modules"
  for LINK in $(find node_modules -depth 1 -type l)
  do
    (echo "Updating top-level npm linked module $LINK" && cd $LINK && git pull && npm update) || exit 1
  done

  echo "Breaking top-level npm links so that npm update doesn't fail (I will put them back later)"
  for LINK in $(find node_modules -depth 1 -type l)
  do
    (echo $LINK && rm $LINK) || exit 1
  done
fi

echo "Updating main project"
git pull
npm update

if [ $WAS_LINKED -ne 0 ]; then
  echo "Restoring links"
  sh scripts/linkall.sh
fi
