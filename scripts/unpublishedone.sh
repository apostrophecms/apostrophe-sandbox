#!/bin/sh

cd $1
git log --name-only -n 1 | grep package.json > /dev/null
if [ $? -ne 0 ] ; then echo "$PWD is modified"; fi
cd ../..
