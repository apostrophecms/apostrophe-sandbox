#!/bin/sh

source scripts/our-modules.source
for MODULE in "${modules[@]}"
# for MODULE in $(find node_modules -depth 1 -type l)
do
  echo $MODULE
  (sh scripts/ownerone.sh `basename $MODULE`)
done

