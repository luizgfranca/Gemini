#!/bin/env bash
set -e

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

echo "[Gemini] installing packages"
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

if ! type docker >/dev/null 2>&1; then
    echo "[Gemini] Fedora adjacent system docker install"
    sudo dnf -y install dnf-plugins-core
    sudo dnf-3 config-manager --add-repo https://download.docker.com/linux/fedora/docker-ce.repo
    sudo dnf install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    sudo usermod -aG docker "$USER"
fi

if ! type insomnium >/dev/null 2>&1; then
    echo "[Gemini] installing insomnium"
    mkdir -p workdir
    curl --location 'https://github.com/ArchGPT/insomnium/releases/download/core%400.2.3-a/Insomnium.Core-0.2.3-a.rpm' > workdir/insomnium.rpm
    sudo dnf install -y ./workdir/insomnium.rpm
fi

sudo dnf install -y gopls rust-analyzer

sudo dnf upgrade -y
