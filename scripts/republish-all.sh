#!/bin/sh

# Republish everything in npm, both the 0.4.x series and the 0.5.x series

# You should updateall successfully first

# You should be Tom or someone who has talked to Tom

source scripts/our-modules.source

for module in "${modules[@]}"
  do
    (
      cd "${HOME}/src/${module}" &&
      (
        git checkout 0.4
        if [ $? -eq 0 ]; then
          echo "Attempting to publish 0.4 series for $module" &&
          git pull &&
          npm version patch &&
          git push &&
          npm publish --force
        else
          echo "*** Unable to check out 0.4 branch for $module, you tell me if that's OK or not"
        fi
      ) || exit 1
      git checkout master &&
      git pull &&
      echo "Attempting to publish master for $module" &&
      npm version patch &&
      git push &&
      npm publish --force --tag beta
    ) || exit 1
  done
echo "Success!"
