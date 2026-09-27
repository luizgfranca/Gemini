#!/bin/env bash
set -e

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

echo "[Gemini] installing packages"
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

if ! type docker >/dev/null 2>&1; then
    echo "[Gemini] Ubuntu adjacent system docker install"
    sudo apt-get update
    sudo apt-get install -y ca-certificates curl
    sudo install -m 0755 -d /etc/apt/keyrings
    sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
    sudo chmod a+r /etc/apt/keyrings/docker.asc

    echo \
        "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
        $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
        sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    sudo apt-get update
    sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    sudo usermod -aG docker "$USER"
fi

if ! type insomnium >/dev/null 2>&1; then
    echo "[Gemini] installing insomnium"
    mkdir -p workdir
    curl --location 'https://github.com/ArchGPT/insomnium/releases/download/core%400.2.3-a/Insomnium.Core-0.2.3-a.deb' > workdir/insomnium.deb
    sudo apt install -y ./workdir/insomnium.deb
fi

sudo apt install -y gopls flatpak plasma-discover-backend-flatpak

sudo apt upgrade -y
