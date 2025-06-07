#!/bin/env bash
set -e
#set -v
#set -x

echo "[Gemini] preparing"
sudo dnf clean
sudo dnf update

echo "[Gemini] installing basic libraries and utilities" 
sudo dnf install -y \
    autoconf-archive \ 
    automake \
    ccache \
    clang \
    clangd \
    cmake \ 
    curl \ 
    liberation-sans-fonts \ 
    libglvnd-devel \ 
    nasm \ 
    ninja-build \ 
    perl-FindBin \ 
    perl-IPC-Cmd \ 
    perl-lib \ 
    tar \ 
    unzip \ 
    zip \ 
    zlib-ng-compat-static \
    git \
    libxcrypt-compat \
    pre-commit


echo "[Gemini] instaling packages"
sudo dnf install -y \
    neovim \
    podman \
    qbittorrent \
    flatpak \
    tmux \
    cmake \
    alacritty \
    tldr \
    vlc \
    fzf \
    hugo

echo "[Gemini] Installing Docker"
sudo dnf -y install dnf-plugins-core
sudo dnf-3 config-manager --add-repo https://download.docker.com/linux/fedora/docker-ce.repo
sudo dnf install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo usermod -aG docker $USER

if ! type code >> /dev/null;
then
	echo "[Gemini] installing vscode"
	mkdir -p workdir
	cd workdir
	curl --location 'https://code.visualstudio.com/sha/download?build=stable&os=linux-rpm-x64' > code.rpm
	sudo dnf install -y ./code.rpm
	cd ..
fi;

if ! type insomnium >> /dev/null;
then
	echo "[Gemini] installing insomnium"
	mkdir -p workdir
	cd workdir
	curl --location 'https://github.com/ArchGPT/insomnium/releases/download/core%400.2.3-a/Insomnium.Core-0.2.3-a.rpm' > insomnium.rpm
	sudo dnf install -y ./insomnium.rpm
	cd ..
fi;

if ! type brave-browser >> /dev/null;
then
    echo "[Gemini] Installing Brave Browser"
    curl -fsS https://dl.brave.com/install.sh | sh
fi;

echo "[Gemini] installing sdkman"
curl -s "https://get.sdkman.io" | bash
source "$HOME/.sdkman/bin/sdkman-init.sh"

echo "[Gemini] installing golang"
cd workdir
curl --location 'https://go.dev/dl/go1.23.4.linux-amd64.tar.gz' > go.tar.gz
rm -rf /usr/local/go && sudo tar -C /usr/local -xzf go.tar.gz
cd ..
sudo dnf install -y gopls

echo "[Gemini] installing Rust"
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
sudo dnf install rust-analyzer

if ! type nvm >> /dev/null;
then
    echo "[Gemini] installing nvm"
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
fi;

if ! type bun >> /dev/null;
then
    echo "[Gemini] Installing Bun"
    curl -fsSL https://bun.sh/install | bash
fi;

echo "[Gemini] setting up flathub"
flatpak remote-add --system --if-not-exists flathub https://dl.flathub.org/repo/flathub.flatpakrepo

echo "[Gemini] installing flatpak applications"
flatpak install -y flathub \
	md.obsidian.Obsidian \
	com.discordapp.Discord \
	com.protonvpn.www \
	io.dbeaver.DBeaverCommunity \
    com.google.Chrome \
    net.mullvad.MullvadBrowser \
    app.drey.Warp

echo '[Gemini] Creating utility script files'
mkdir -p "$HOME/bin"
cp bin/* "$HOME/bin/"
chmod +x "$HOME"/bin/*

echo '[Gemini] Setting up bashrc'
cp "$HOME"/.bashrc "$HOME"/.bashrc-original
cp .bashrc "$HOME"
cp .bash_git "$HOME"

echo '[Gemini] Setting up tmux'
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

echo '[Gemini] jetbrains...'
cp -r JetBrains "$HOME"/.config

echo "[Gemini] installing fonts"
sudo cp -r fonts/iosevka-ss18 /usr/share/fonts
sudo cp -r fonts/iosevka-ss04 /usr/share/fonts   
sudo cp -r fonts/Inter-4.1 /usr/share/fonts

echo '[Gemini] setting up KDE Plasma configuration'
if [[ "$DESKTOP_SESSION" == "plasma" ]] || [[ "$XDG_CURRENT_DESKTOP" == "KDE" ]]; then
    kwriteconfig5 --file kwinrc --group ModifierOnlyShortcuts --key Meta "org.kde.krunner,/App,,invokeShortcut,Overview"

    kwriteconfig5 --file kwinrc --group Desktops --key Number "4"; 
    kwriteconfig5 --file kwinrc --group Desktops --key Rows "1"; 
    kwriteconfig5 --file ksmserverrc --group General --key loginMode "emptySession";
    kwriteconfig5 --file kdeglobals --group General --key AccentColor "silver";
    kwriteconfig5 --file konsolerc --group Desktop Entry --key DefaultProfile "custom.profile"; 
    kwriteconfig5 --file kwinrc --group "org.kde.kdecoration2" --key ButtonsOnLeft "X"; 
    kwriteconfig5 --file kwinrc --group "org.kde.kdecoration2" --key ButtonsOnRight "M"; 
else
    echo "System is not running KDE Plasma. Skipping"
fi

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
