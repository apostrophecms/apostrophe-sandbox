#!/bin/sh

for MODULE in $(find node_modules -depth 1 -type l)
do
  (sh scripts/ownerone.sh `basename $MODULE`)
done

