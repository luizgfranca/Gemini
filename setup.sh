#!/bin/env bash
set -e
#set -v
#set -x


if type dnf >> /dev/null;
then
    echo "[Gemini] DNF system package manager detected"
    echo "[Gemini] preparing"
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
        ninja-build \
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
fi;

if type apt >> /dev/null;
then
    echo "[Gemini] APT system package manager detected"
    echo "[Gemini] preparing"
    sudo apt update

    echo "[Gemini] installing basic libraries and utilities" 
    sudo apt install -y \
        autoconf-archive \
        automake \
        ccache \
        clang \
        clangd \
        cmake \
        curl \
        fonts-liberation \
        ninja-build \
        perl \
        tar \
        unzip \
        zip \
        zlib1g-dev \
        git \
        libcrypt-dev \
        pre-commit

    echo "[Gemini] instaling packages"
    sudo apt install -y \
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
fi;

echo "[Gemini] Installing Docker"
if type dnf >> /dev/null;
then
    echo "[Gemini] Fedora adjacent system docker install"
    set -x
    sudo dnf -y install dnf-plugins-core
    sudo dnf-3 config-manager --add-repo https://download.docker.com/linux/fedora/docker-ce.repo
    sudo dnf install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    sudo usermod -aG docker $USER
    set +x
fi;

echo "[Gemini] Installing Docker"
if type apt >> /dev/null;
then
    echo "[Gemini] Ubuntu adjacent system docker install"
    set -x
    # Add Docker's official GPG key:
    sudo apt-get update
    sudo apt-get install ca-certificates curl
    sudo install -m 0755 -d /etc/apt/keyrings
    sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
    sudo chmod a+r /etc/apt/keyrings/docker.asc

    # Add the repository to Apt sources:
    echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
    $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
    sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    sudo apt-get update

    sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    sudo usermod -aG docker $USER
    set +x
fi;



# if ! type code >> /dev/null;
# then
# 	echo "[Gemini] installing vscode"
#     set -x
# 	mkdir -p workdir
# 	cd workdir
# 	curl --location 'https://code.visualstudio.com/sha/download?build=stable&os=linux-rpm-x64' > code.rpm
# 	sudo dnf install -y ./code.rpm
# 	cd ..
#     set +x
#
#
#   UBUNTU LINK https://vscode.download.prss.microsoft.com/dbazure/download/stable/2901c5ac6db8a986a5666c3af51ff804d05af0d4/code_1.101.2-1750797935_amd64.deb
# fi;

if ! type insomnium >> /dev/null;
then
    if type dnf >> /dev/null;
    then
        echo "[Gemini] installing insomnium"
        set -x
        mkdir -p workdir
        cd workdir
        curl --location 'https://github.com/ArchGPT/insomnium/releases/download/core%400.2.3-a/Insomnium.Core-0.2.3-a.rpm' > insomnium.rpm
        sudo dnf install -y ./insomnium.rpm
        cd ..
        set +x
    fi;
    if type apt >> /dev/null;
    then
        echo "[Gemini] installing insomnium"
        set -x
        mkdir -p workdir
        cd workdir
        curl --location 'https://github.com/ArchGPT/insomnium/releases/download/core%400.2.3-a/Insomnium.Core-0.2.3-a.deb' > insomnium.deb
        sudo apt install -y ./insomnium.deb
        cd ..
        set +x
    fi;
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
set -x
cd workdir
curl --location 'https://go.dev/dl/go1.23.4.linux-amd64.tar.gz' > go.tar.gz
rm -rf /usr/local/go && sudo tar -C /usr/local -xzf go.tar.gz
cd ..

if type dnf >> /dev/null;
then
    sudo dnf install -y gopls
fi;

if type apt >> /dev/null;
then
    sudo apt install -y gopls
fi;
set +x

echo "[Gemini] installing Rust"
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs
if type dnf >> /dev/null;
then
    sudo dnf install -y rust-analyzer
fi;

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
set -x
flatpak remote-add --system --if-not-exists flathub https://dl.flathub.org/repo/flathub.flatpakrepo
set +x

if type apt >> /dev/null;
then
    echo "[Gemini] installing flathub discover plugin"
    set -x
    sudo apt install flatpak plasma-discover-backend-flatpak
    set +x
fi;


echo "[Gemini] installing flatpak applications"
set -x
flatpak install --system -y flathub \
	md.obsidian.Obsidian \
	com.discordapp.Discord \
	com.protonvpn.www \
	io.dbeaver.DBeaverCommunity \
    com.google.Chrome \
    net.mullvad.MullvadBrowser \
    app.drey.Warp
set +x

echo '[Gemini] Creating utility script files'
set -x
mkdir -p "$HOME/bin"
cp bin/* "$HOME/bin/"
chmod +x "$HOME"/bin/*
set +x

echo '[Gemini] Setting up bashrc'
set -x
cp "$HOME"/.bashrc "$HOME"/.bashrc-original
cp .bashrc "$HOME"
cp .bash_git "$HOME"
set +x

echo '[Gemini] Setting up tmux'
set -x
cp .tmux.conf "$HOME"
set +x

# echo "[Gemini] installing vscode extensions"
# set -x
# sh vscode/install-extensions.sh
# set +x

echo "[Gemini] placing application config:"
# echo "[Gemini] vscode..."
# set -x
cp vscode/config/settings.json "$HOME/.config/Code/User/"
cp vscode/config/keybindings.json "$HOME/.config/Code/User/"
cp -r vscode/config/snippets "$HOME/.config/Code/User/"
# set +x

echo "[Gemini] alacritty..."
set -x
cp -r alacritty "$HOME/.config/"
set +x

echo "[Gemini] tms..."
set -x
cp -r tms "$HOME/.config/"
set +x

echo "[Gemini] konsole..."
set -x
cp -r konsole "$HOME/.config/"
set +x

echo '[Gemini] jetbrains...'
set -x
cp -r JetBrains "$HOME"/.config
set +x

echo "[Gemini] neovim..."
set -x
cp -r nvim "$HOME"/.config
set +x

echo "[Gemini] installing fonts"
set -x
sudo cp -r fonts/iosevka-ss18 /usr/share/fonts
sudo cp -r fonts/iosevka-ss04 /usr/share/fonts   
sudo cp -r fonts/Inter-4.1 /usr/share/fonts
set +x

echo '[Gemini] setting up KDE Plasma configuration'
if [[ "$DESKTOP_SESSION" == "plasma" ]] || [[ "$XDG_CURRENT_DESKTOP" == "KDE" ]]; then
    set -x
    kwriteconfig5 --file kwinrc --group ModifierOnlyShortcuts --key Meta "org.kde.krunner,/App,,invokeShortcut,Overview"

    kwriteconfig5 --file kwinrc --group Desktops --key Number "4"; 
    kwriteconfig5 --file kwinrc --group Desktops --key Rows "1"; 
    kwriteconfig5 --file ksmserverrc --group General --key loginMode "emptySession";
    kwriteconfig5 --file kdeglobals --group General --key AccentColor "silver";
    kwriteconfig5 --file konsolerc --group Desktop Entry --key DefaultProfile "custom.profile"; 
    kwriteconfig5 --file kwinrc --group "org.kde.kdecoration2" --key ButtonsOnLeft "X"; 
    kwriteconfig5 --file kwinrc --group "org.kde.kdecoration2" --key ButtonsOnRight "M"; 
    set +x
else
    echo "System is not running KDE Plasma. Skipping"
fi

echo '[Gemini] setting up Gnome Shell configuration'
if [[ "$DESKTOP_SESSION" == "gnome" ]]; then
    set -x
    dconf write /org/gnome/desktop/wm/keybindings/minimize "@as []"
    dconf write /org/gnome/desktop/wm/keybindings/switch-to-workspace-left "@as []"
    dconf write /org/gnome/desktop/wm/keybindings/switch-to-workspace-left "['<Super>Left', '<Super>h']"
    dconf write /org/gnome/mutter/keybindings/toggle-tiled-left "@as []"
    dconf write /rg/gnome/settings-daemon/plugins/media-keys/screensaver "@as []"
    dconf write /org/gnome/desktop/wm/keybindings/switch-to-workspace-right "@as []"
    dconf write /org/gnome/desktop/wm/keybindings/switch-to-workspace-right "['<Super>Right', '<Super>l']"
    dconf write /org/gnome/mutter/keybindings/toggle-tiled-right "@as []"
    dconf write /org/gnome/desktop/wm/keybindings/move-to-monitor-left "@as []"
    dconf write /org/gnome/desktop/wm/keybindings/move-to-monitor-left "['<Control><Super>Left']"
    dconf write /org/gnome/desktop/wm/keybindings/move-to-monitor-right "@as []"
    dconf write /org/gnome/desktop/wm/keybindings/move-to-monitor-right "['<Control><Super>Right']"
    dconf write /org/gnome/desktop/wm/keybindings/move-to-workspace-left "@as []"
    dconf write /org/gnome/desktop/wm/keybindings/move-to-workspace-left "['<Alt><Super>Left', '<Alt><Super>h']"
    dconf write /org/gnome/desktop/wm/keybindings/move-to-workspace-right "@as []"
    dconf write /org/gnome/desktop/wm/keybindings/move-to-workspace-right "['<Alt><Super>Right', '<Alt><Super>l']"
    dconf write /org/gnome/settings-daemon/plugins/media-keys/custom-keybindings/custom0/binding "'<Super>t'"
    dconf write /org/gnome/settings-daemon/plugins/media-keys/custom-keybindings/custom0/command "'alacritty'"
    dconf write /org/gnome/settings-daemon/plugins/media-keys/custom-keybindings/custom0/name "'terminal'"
    dconf write /org/gnome/settings-daemon/plugins/media-keys/custom-keybindings "['/org/gnome/settings-daemon/plugins/media-keys/custom-keybindings/custom0/']"
    dconf write /org/gnome/desktop/wm/keybindings/toggle-maximized "@as []"
    dconf write /org/gnome/desktop/wm/keybindings/maximize "@as []"
    dconf write /org/gnome/desktop/wm/keybindings/toggle-maximized "['<Super>Up']"
    dconf write /org/gnome/mutter/keybindings/toggle-tiled-left "['<Shift><Super>Left']"
    dconf write /org/gnome/mutter/keybindings/toggle-tiled-right "['<Shift><Super>Right']"
    dconf write /org/gnome/desktop/wm/keybindings/switch-to-workspace-1 "@as []"
    dconf write /org/gnome/desktop/wm/keybindings/switch-to-workspace-1 "['<Super>1']"
    dconf write /org/gnome/shell/keybindings/switch-to-application-1 "@as []"
    dconf write /org/gnome/desktop/wm/keybindings/switch-to-workspace-2 "@as []"
    dconf write /org/gnome/desktop/wm/keybindings/switch-to-workspace-2 "['<Super>2']"
    dconf write /org/gnome/shell/keybindings/switch-to-application-2 "@as []"
    dconf write /org/gnome/desktop/wm/keybindings/switch-to-workspace-3 "@as []"
    dconf write /org/gnome/desktop/wm/keybindings/switch-to-workspace-3 "['<Super>3']"
    dconf write /org/gnome/shell/keybindings/switch-to-application-3 "@as []"
    dconf write /org/gnome/desktop/wm/keybindings/switch-to-workspace-4 "@as []"
    dconf write /org/gnome/desktop/wm/keybindings/switch-to-workspace-4 "['<Super>4']"
    dconf write /org/gnome/shell/keybindings/switch-to-application-4 "@as []"
    dconf write /org/gnome/desktop/wm/keybindings/begin-resize "@as []"
    dconf write /org/gnome/desktop/wm/keybindings/begin-resize "['<Super>Down']"
    dconf write /org/gnome/desktop/wm/keybindings/unmaximize "@as []"
    dconf write /org/gnome/desktop/interface/icon-theme 'Adwaita'
    dconf write org/gnome/desktop/wm/preferences/button-layout 'appmenu:minimize,close'
    dconf write org/gnome/desktop/wm/preferences/button-layout 'appmenu:close'
    dconf write org/gnome/desktop/wm/preferences/button-layout 'close:appmenu'
    dconf write org/gnome/desktop/wm/keybindings/switch-applications "@as []"
    dconf write org/gnome/desktop/wm/keybindings/switch-applications-backward "@as []"
    dconf write org/gnome/desktop/wm/keybindings/switch-windows "['<Alt>Tab']"
    dconf write org/gnome/desktop/wm/keybindings/switch-windows-backward "['<Shift><Alt>Tab']"
    set +x
else
    echo "System is not running Gnome Shell. Skipping"
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

if type kwin_wayland >> /dev/null;
then
	echo "[Gemini] Restarting user's KWin for configuration to take effect"
	nohup kwin_wayland --replace > /dev/null &
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
