#!/bin/env bash

set -e
#set -v
#set -x

echo "[Gemini] preparing"
sudo apt update
sudo apt upgrade -y

echo "[Gemini] instaling packages"
sudo apt install -y \
    neovim \
    curl \
    podman \
    distrobox \
    qbittorrent \
    flatpak \
    neovim \
    terminator


if ! type code >> /dev/null;
then
	echo "[Gemini] installing vscode"
	mkdir -p workdir
	cd workdir
	curl --location 'https://code.visualstudio.com/sha/download?build=stable&os=linux-deb-x64' > code.deb
	sudo dpkg -i code.deb
	cd ..
fi;

if ! type docker >> /dev/null;
then
	echo "[Gemini] installing Docker"
	# CODE FROM: https://docs.docker.com/engine/install/ubuntu/
	# Add Docker's official GPG key:
	sudo apt-get update
	sudo apt-get install ca-certificates curl gnupg
	sudo install -m 0755 -d /etc/apt/keyrings
	curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
	sudo chmod a+r /etc/apt/keyrings/docker.gpg

	# Add the repository to Apt sources:
	echo \
	  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
	  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
	  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
	sudo apt-get update
	sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

	# CODE FROM: https://docs.docker.com/engine/install/linux-postinstall/
	sudo groupadd -f docker
	sudo usermod -aG docker $USER
fi;

echo "[Gemini] installing sdkman"
curl -s "https://get.sdkman.io" | bash
source "$HOME/.sdkman/bin/sdkman-init.sh"

echo "[Gemini] setting up flathub"
flatpak remote-add --system --if-not-exists flathub https://dl.flathub.org/repo/flathub.flatpakrepo

echo '[Gemini] Creating utility script files'
mkdir -p "$HOME/bin"
cp bin/* "$HOME/bin/"
chmod +x "$HOME"/bin/*

echo '[Gemini] Setting up bashrc'
cp "$HOME"/.bashrc "$HOME"/.bashrc-original
cp .bashrc "$HOME"
cp .bash_git "$HOME"

echo "[Gemini] installing vscode extensions"
sh vscode/install-extensions.sh

echo "[Gemini] placing vscode config file"
cp vscode/config/settings.json "$HOME/.config/Code/User/"
cp vscode/config/keybindings.json "$HOME/.config/Code/User/"
cp -r vscode/config/snippets "$HOME/.config/Code/User/"

echo '[Gemini] setting up JetBrains editors'
cp -r JetBrains "$HOME"/.config

echo '[Gemini] setting up keyboard shortcuts'
kwriteconfig5 --file kwinrc --group ModifierOnlyShortcuts --key Meta "org.kde.krunner,/App,,toggleDisplay"

kwriteconfig5 --file kwinrc --group Desktops --key Number "4"; 
kwriteconfig5 --file kwinrc --group Desktops --key Rows "1"; 
kwriteconfig5 --file ksmserverrc --group General --key loginMode "emptySession";
kwriteconfig5 --file kdeglobals --group General --key AccentColor "silver";
kwriteconfig5 --file konsolerc --group Desktop Entry --key DefaultProfile "custom.profile"; 
kwriteconfig5 --file kwinrc --group "org.kde.kdecoration2" --key ButtonsOnLeft "X"; 
kwriteconfig5 --file kwinrc --group "org.kde.kdecoration2" --key ButtonsOnRight "M"; 

#kwriteconfig5 --file kglobalshortcutsrc --group kwin --key "Switch One Desktop to the Left" "none,Meta+Left,Switch One Desktop to the Left";
#kwriteconfig5 --file kglobalshortcutsrc --group kwin --key "Switch One Desktop to the Right" "Meta+Right"; 
#kwriteconfig5 --file kglobalshortcutsrc --group kwin --key "Window Quick Tile Left" "Meta+Shift+Left";
#kwriteconfig5 --file kglobalshortcutsrc --group kwin --key "Window Quick Tile Right" "Meta+Shift+Right";
#kwriteconfig5 --file kglobalshortcutsrc --group kwin --key "Window to Next Screen" "Meta+Ctrl+Right";
#kwriteconfig5 --file kglobalshortcutsrc --group kwin --key "Window to Previous Screen" "Meta+Ctrl+Left";

if type kwin_x11 >> /dev/null;
then
	echo "[Gemini] Restarting user's KWin for configuration to take effect"
	nohup kwin_x11 --replace > /dev/null &
	sleep 1
fi;

if type konsole >> /dev/null;
then
	echo "[Gemini] installing konsole profile config files"
	cp -r konsole "$HOME/.local/share/"
fi;

echo "[Gemini] reloading bash profile"
source $HOME/.bashrc

echo "[Gemini] done";
