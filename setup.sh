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
        pre-commit \
        ntfs-3g

    echo "[Gemini] instaling packages"
    sudo dnf install -y \
        neovim \
        podman \
        qbittorrent \
        flatpak \
        tmux \
        cmake \
        vlc \
        fzf \
        hugo \
        ripgrep
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
        pre-commit \
        ntfs-3g

    echo "[Gemini] instaling packages"
    sudo apt install -y \
        neovim \
        podman \
        qbittorrent \
        flatpak \
        tmux \
        cmake \
        vlc \
        fzf \
        hugo \
        ripgrep
fi;

if type pacman >> /dev/null;
then
    echo "[Gemini] Pacman system package manager detected"
    echo "[Gemini] preparing"
    sudo pacman -Syu --needed --noconfirm

    echo "[Gemini] installing basic libraries and utilities"
    sudo pacman -S --needed --noconfirm \
        base-devel \
        autoconf-archive \
        automake \
        ccache \
        clang \
        cmake \
        curl \
        ttf-liberation \
        ninja \
        perl \
        tar \
        unzip \
        zip \
        git \
        libxcrypt \
        pre-commit \
        wl-clipboard \
        xclip \
        ntfs-3g

    echo "[Gemini] instaling packages"
    sudo pacman -S --needed --noconfirm \
        neovim \
        podman \
        qbittorrent \
        steam \
        flatpak \
        tmux \
        vlc \
        fzf \
        hugo \
        ripgrep \
        go \
        gopls \
        kitty \
        rustup \
        bun \
        code \
        intellij-idea-community-edition \
        scrcpy
fi;


if ! type docker >> /dev/null;
then
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

    if type pacman >> /dev/null;
    then
        echo "[Gemini] Arch adjacent system docker install"
        set -x
        sudo pacman -S --needed --noconfirm docker
        sudo usermod -aG docker $USER
        set +x
    fi;
fi;

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

    if type pacman >> /dev/null;
    then
        echo "[Gemini] Installing insomnium from the AUR"
        set -x
        mkdir -p workdir
        cd workdir
        git clone https://aur.archlinux.org/insomnium-bin.git
        cd insomnium-bin
        makepkg --clean --syncdeps --install
        cd .. # insomnium-bin
        cd .. # workdir
        set +x
    fi;
fi;

if ! type brave-browser >> /dev/null;
then
    echo "[Gemini] Installing Brave Browser"
    curl -fsS https://dl.brave.com/install.sh | sh
fi;

if ! type sdk >> /dev/null;
then
    echo "[Gemini] installing sdkman"
    set -x
    curl -s "https://get.sdkman.io" | bash
    source "$HOME/.sdkman/bin/sdkman-init.sh"
    set +x
fi;

if ! type go >> /dev/null && ! type pacman >> /dev/null;
then
    echo "[Gemini] installing golang"
    set -x
    cd workdir
    curl --location 'https://go.dev/dl/go1.23.4.linux-amd64.tar.gz' > go.tar.gz
    rm -rf /usr/local/go && sudo tar -C /usr/local -xzf go.tar.gz
    set +x
    cd ..
fi;

if type dnf >> /dev/null;
then
    sudo dnf install -y gopls
fi;

if type apt >> /dev/null;
then
    sudo apt install -y gopls
fi;
set +x

if type rustup >> /dev/null && ! type pacman >> /dev/null;
then
    echo "[Gemini] installing Rust (path only taken if not Arch based OS)"
    set -x
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs
    set +x
fi;

if type dnf >> /dev/null;
then
    sudo dnf install -y rust-analyzer
fi;

if ! type rust-analyzer;
then
    rustup default stable
    rustup component add rust-analyzer
fi;

if ! type nvm >> /dev/null;
then
    echo "[Gemini] installing nvm"
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
fi;

if ! type bun >> /dev/null && ! type pacman >> /dev/null;
then
    echo "[Gemini] Installing Bun (only for non-Arch systems)"
    curl -fsSL https://bun.sh/install | bash
fi;

echo "[Gemini] setting up flathub"
set -x
flatpak remote-add --system --if-not-exists flathub https://dl.flathub.org/repo/flathub.flatpakrepo
set +x

if type apt >> /dev/null;
then
    echo "[Gemini] installing flathub discover plugin (Kubuntu workaround)"
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
    app.drey.Warp \
    com.github.tchx84.Flatseal

sudo flatpak override md.obsidian.Obsidian --filesystem="/data"
sudo flatpak override com.discordapp.Discord --filesystem="/data"
set +x


if ! type automata >> /dev/null;
then
    echo "[Gemini] installing latest automata build"
    set -x
    cd workdir
    git clone --depth=1 https://github.com/luizgfranca/automata.git 
    cd automata
    cargo build --release
    sudo cp target/release/automata "$HOME/bin"
    cd .. # automata
    cd .. # workdir
    set +x
fi;

echo '[Gemini] Creating utility script files'
set -x
mkdir -p "$HOME/bin"
cp bin/* "$HOME/bin/"
chmod +x "$HOME"/bin/*
set +x

echo '[Gemini] Setting up bash'
set -x
cp "$HOME"/.bashrc "$HOME"/.bashrc-original
cp .bashrc "$HOME"
cp .bash_git "$HOME"
cp .inputrc "$HOME"


if [[ "$SHELL" != "/bin/bash" ]]; then
    sudo chsh -s /bin/bash
fi;
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
echo "[Gemini] vscode..."
set -x
mkdir -p "$HOME/.config/Code/User/"
cp vscode/config/settings.json "$HOME/.config/Code/User/"
cp vscode/config/keybindings.json "$HOME/.config/Code/User/"
cp -r vscode/config/snippets "$HOME/.config/Code/User/"
set +x

# echo "[Gemini] alacritty..."
# set -x
# cp -r alacritty "$HOME/.config/"
# set +x

echo "[Gemini] kitty..."
set -x
cp -r kitty "$HOME/.config/"
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
nvim --headless "+Lazy! update" +qa
pushd "$HOME"/.local/share/nvim/lazy/fff.nvim
cargo build
popd
set +x

if type konsole >> /dev/null;
then
	echo "[Gemini] konsole..."
	cp -r konsole "$HOME/.local/share/"
fi;

echo "[Gemini] installing fonts"
set -x
sudo cp -r fonts/iosevka-ss18 /usr/share/fonts
sudo cp -r fonts/iosevka-ss04 /usr/share/fonts   
sudo cp -r fonts/Inter-4.1 /usr/share/fonts
set +x

if [ ! -d "workdir/fstab-lock" ]; then
    echo "[Gemini] setting up data partition auto mount"
    set -x
    sudo cp /etc/fstab /etc/fstab-bkp
    echo "UUID=2AB2A0797364739B                    /data          ntfs-3g    defaults,rw 0 0" | sudo tee --append /etc/fstab
    touch workdir/fstab-lock
    set +x
fi;

if [ -d "./BraveSoftware" ]; then
    echo "[Gemini] Brave backup detected"
    echo "[Gemini] restoring brave backup"
    set -x
    cp -r BraveSoftware "$HOME/.config/"
    rm "$HOME/.config/BraveSoftware/Brave-Browser/SingletonLock" 
    set +x

    echo "[Gemini] marking restored backup"
    set -x
    mv BraveSoftware BraveSoftware-restored
    set +x
fi;



echo '[Gemini] setting up KDE Plasma configuration'
if [[ "$DESKTOP_SESSION" == "plasma" ]] || [[ "$XDG_CURRENT_DESKTOP" == "KDE" ]]; then
    set -x
    mv "$HOME/.config/kglobalshortcutsrc" "$HOME/.config/kglobalshortcutsrc-old"
    cp kglobalshortcutsrc "$HOME/.config"
#    kwriteconfig6 --file kwinrc --group ModifierOnlyShortcuts --key Meta "org.kde.krunner,/App,,invokeShortcut,Overview" --notify;
    kwriteconfig6 --file kwinrc --group Desktops --key Number "4" --notify;
    kwriteconfig6 --file kwinrc --group Desktops --key Rows "1" --notify;
    kwriteconfig6 --file kwinrc --group "org.kde.kdecoration2" --key ButtonsOnLeft "X" --notify;
    kwriteconfig6 --file kwinrc --group "org.kde.kdecoration2" --key ButtonsOnRight "M" --notify;

    kwriteconfig6 --file ksmserverrc --group General --key loginMode "emptySession" --notify;

#     kwriteconfig5 --file kdeglobals --group General --key AccentColor "silver";
    kwriteconfig6 --file konsolerc --group Desktop Entry --key DefaultProfile "custom.profile" --notify;

    kwriteconfig6 --file kcminputrc --group Keyboard --key RepeatDelay "400" --notify;
    kwriteconfig6 --file kcminputrc --group Keyboard --key RepeatRate "45" --notify;
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
#
# if type kwin_wayland >> /dev/null;
# then
# 	echo "[Gemini] Restarting user's KWin for configuration to take effect"
# 	nohup kwin_wayland --replace > /dev/null &
# 	sleep 1
# fi;


echo "[Gemini] reloading bash profile"
source $HOME/.bashrc

echo "[Gemini] done";
