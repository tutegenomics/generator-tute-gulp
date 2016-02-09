#!/bin/bash

# Following functions from: https://gist.github.com/JamieMason/4761049
# ==============================================

# return 1 if global command line program installed, else 0
# example
# echo "node: $(program_is_installed node)"
function program_is_installed {
  # set to 1 initially
  local return_=1
  # set to 0 if not found
  type $1 >/dev/null 2>&1 || { local return_=0; }
  # return value
  echo "$return_"
}

red='\033[0;31m'
green='\033[32m'
NC='\033[0m' # No Color

# display a message in red with a cross by it
# example
# echo echo_fail "No"
function echo_fail {
  # echo first argument in red
  printf "${red} ✘ ${1} Please install this dependency globally."
  # reset colours back to normal
  echo -e "${NC}"
}

# display a message in green with a tick by it
# example
# echo echo_fail "Yes"
function echo_pass {
  # echo first argument in green
  printf "${green} ✔ ${1}"
  # reset colours back to normal
  echo -e "${NC}"
}

# echo pass or fail
# example
# echo echo_if 1 "Passed"
# echo echo_if 0 "Failed"
function echo_if {
  if [ $1 == 1 ]; then
    echo_pass $2
  else
    echo_fail $2
  fi
}

# ==============================================

#Now actually do stuff...

#check if global dependencies are installed
echo "Checking for global dependencies..."
echo "node $(echo_if $(program_is_installed node))"
echo "bower $(echo_if $(program_is_installed bower))"
echo "gulp $(echo_if $(program_is_installed gulp))"

npm install
bower install
npm run build


exit
