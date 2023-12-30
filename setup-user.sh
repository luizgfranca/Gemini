#!/bin/bash

set -e
#set -v
#set -x

echo 'Creating utility script files'
mkdir -p "$HOME/bin"
cp bin/* "$HOME/bin/"
chmod +x "$HOME"/bin/*

if echo "$PATH" | grep -q "$HOME/bind";
then 
  echo "adding home bin folder to path";
  export PATH=$HOME/bin:$PATH
else echo 'home folder already on $PATH no need to add again'; 
fi;

echo 'Setting up bashrc'
cp "$HOME"/.bashrc "$HOME"/.bashrc-original
cp .bashrc "$HOME"
cp bash_git "$HOME"

echo "Installing vscode extensions"
sh vscode/install-extensions.sh

echo "Done."