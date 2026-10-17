#!/bin/env bash
set -euo pipefail
set -x

if command -v go >/dev/null 2>&1; then
    echo "[Gemini] Go is already installed"
    exit 0
fi

echo "[Gemini] installing golang"
go_arch="$(uname -m)"

release_metadata="$(curl -fsSL 'https://go.dev/dl/?mode=json')"
release_file="$(jq -er --arg arch "$go_arch" '
    first(
        .[]
        | select(.stable == true)
        | .files[]
        | select(.os == "linux" and .arch == $arch and .kind == "archive")
        | [.filename, .sha256]
        | @tsv
    )
' <<< "$release_metadata")"

IFS=$'\t' read -r archive_name archive_sha256 <<< "$release_file"
if [[ -z "$archive_name" || -z "$archive_sha256" ]]; then
    echo "[Gemini] Could not find a stable Go archive for linux/$go_arch" >&2
    exit 1
fi

download_dir="$(mktemp -d)"
trap 'rm -rf "$download_dir"' EXIT
archive_path="$download_dir/$archive_name"

curl -fsSL "https://go.dev/dl/$archive_name" -o "$archive_path"
printf '%s  %s\n' "$archive_sha256" "$archive_path" | sha256sum --check --status

echo "[Gemini] Installing $archive_name"
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -xzf "$archive_path"
set +x
