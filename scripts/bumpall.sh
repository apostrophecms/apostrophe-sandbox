#!/bin/sh

source scripts/our-modules.source

for module in "${modules[@]}"
  do
    echo $module
    sh scripts/bump.sh $module
  done
