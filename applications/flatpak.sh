#!/bin/env bash
set -e

echo "[Gemini] setting up flathub"
set -x
flatpak remote-add --system --if-not-exists flathub https://dl.flathub.org/repo/flathub.flatpakrepo
set +x

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

flatpak update -y --noninteractive   

sudo flatpak override md.obsidian.Obsidian --filesystem="/data"
sudo flatpak override com.discordapp.Discord --filesystem="/data"
flatpak uninstall --unused -y
sudo rm -rfv /var/tmp/flatpak-cache-*   
set +x
