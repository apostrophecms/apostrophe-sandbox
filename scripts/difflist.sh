#!/bin/sh
echo "\n"
echo "\033[33;34m====================================================================\033[0m"
echo "\033[33;34mThe following Apostrophe modules are ahead in your \033[33;33mlocal\033[0m \033[34;mrepos:\033[0m"
echo "\033[33;34m====================================================================\033[0m"

for LINK in $(find node_modules -depth 1 -type l)
do
  cd $LINK
  RESULT=`git diff --color`
  if [ -n "$RESULT" ]
    then
      echo "\n"
      echo "\033[33;33m## $LINK\033[0m"
      echo "\033[33;34m=================================================\033[0m"
      git status -sb
      echo "\n"
  fi
  cd ../..
done
