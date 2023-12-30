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
cp .bash_git "$HOME"

echo "Setting up vscode"
sh vscode/install-extensions.sh
cp -r vscode/config/Code "$HOME"/.config 

echo 'Setting up helix-editor configuration'
if type hx >> /dev/null;
then cp -r helix/* "$HOME"/.config/helix;
else echo 'Helix not installed, skipping step';
fi;

echo 'Setting up JetBrains editors'
cp -r JetBrains "$HOME"/.config


echo "Done."