#!/bin/env bash
:a

set -e
#set -v
#set -x

echo "[Gemini] preparing"
sudo dnf update

echo "[Gemini] instaling packages"
sudo dnf install -y \
    neovim \
    curl \
    podman \
    distrobox \
    qbittorrent \
    flatpak \
    neovim \
    tmux \
    clang \
    cmake \
    alacritty \
    tldr \
    vlc \
    fzf \
    clangd 




if ! type code >> /dev/null;
then
	echo "[Gemini] installing vscode"
	mkdir -p workdir
	cd workdir
	curl --location 'https://code.visualstudio.com/sha/download?build=stable&os=linux-rpm-x64' > code.rpm
	sudo dnf install -y ./code.rpm
	cd ..
fi;

# if ! type insomnium >> /dev/null;
# then
	echo "[Gemini] installing insomnium"
	mkdir -p workdir
	cd workdir
	curl --location 'https://github.com/ArchGPT/insomnium/releases/download/core%400.2.3-a/Insomnium.Core-0.2.3-a.rpm' > insomnium.rpm
	sudo dnf install -y ./insomnium.rpm
	cd ..
# fi;



echo "[Gemini] installing sdkman"
curl -s "https://get.sdkman.io" | bash
source "$HOME/.sdkman/bin/sdkman-init.sh"

echo "[Gemini] installing golang"
cd workdir
curl --location 'https://go.dev/dl/go1.23.4.linux-amd64.tar.gz' > go.tar.gz
rm -rf /usr/local/go && sudo tar -C /usr/local -xzf go.tar.gz
cd ..

echo "[Gemini] installing Rust"
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

echo "[Gemini] installing nvm"
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

echo "[Gemini] setting up flathub"
flatpak remote-add --system --if-not-exists flathub https://dl.flathub.org/repo/flathub.flatpakrepo

echo "[Gemini] installing flatpak applications"
flatpak install -y flathub \
	md.obsidian.Obsidian \
	com.discordapp.Discord \
	com.protonvpn.www \
	io.dbeaver.DBeaverCommunity


echo '[Gemini] Creating utility script files'
mkdir -p "$HOME/bin"
cp bin/* "$HOME/bin/"
chmod +x "$HOME"/bin/*

echo '[Gemini] Setting up bashrc'
cp "$HOME"/.bashrc "$HOME"/.bashrc-original
cp .bashrc "$HOME"
cp .bash_git "$HOME"

echo '[Gemini] Setting tmux'
cp .tmux.conf "$HOME"

echo "[Gemini] installing vscode extensions"
sh vscode/install-extensions.sh

echo "[Gemini] placing application config:"
echo "[Gemini] vscode..."
cp vscode/config/settings.json "$HOME/.config/Code/User/"
cp vscode/config/keybindings.json "$HOME/.config/Code/User/"
cp -r vscode/config/snippets "$HOME/.config/Code/User/"

echo "[Gemini] alacritty..."
cp -r alacritty "$HOME/.config/"

echo "[Gemini] tms..."
cp -r tms "$HOME/.config/"

echo "[Gemini] konsole..."
cp -r konsole "$HOME/.config/"

echo '[Gemini] setting up JetBrains editors'
cp -r JetBrains "$HOME"/.config

echo '[Gemini] setting up keyboard shortcuts'
kwriteconfig5 --file kwinrc --group ModifierOnlyShortcuts --key Meta "org.kde.krunner,/App,,invokeShortcut,Overview"

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
