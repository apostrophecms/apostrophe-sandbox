#!/bin/sh

cd $1
RESULT=`git diff`
if [ -n "$RESULT" ]
  then
    echo "**** $1\n\n"
    echo "$RESULT"
fi
cd ../..
