#!/bin/sh

for LINK in $(find node_modules -depth 1 -type l)
do
  sh scripts/diffone.sh $LINK
done

# Don't forget "project level"
sh scripts/diffone.sh .
