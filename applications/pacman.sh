#!/bin/env bash
set -e

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

echo "[Gemini] installing packages"
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

if ! type docker >/dev/null 2>&1; then
    echo "[Gemini] Arch adjacent system docker install"
    sudo pacman -S --needed --noconfirm docker
    sudo usermod -aG docker "$USER"
fi

if ! type insomnium >/dev/null 2>&1; then
    echo "[Gemini] Installing insomnium from the AUR"
    mkdir -p workdir
    git clone https://aur.archlinux.org/insomnium-bin.git workdir/insomnium-bin
    (cd workdir/insomnium-bin && makepkg --clean --syncdeps --install)
fi

sudo pacman -Syu  --noconfirm
