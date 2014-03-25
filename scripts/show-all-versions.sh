#!/bin/sh

# Republish everything in npm, both the 0.4.x series and the 0.5.x series

# You should updateall successfully first

# You should be Tom or someone who has talked to Tom

source scripts/our-modules.source

for module in "${modules[@]}"
  do
    npm info $module | grep latest
  done
