#!/bin/env bash
set -e

script_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"

echo '[Gemini] Setting up bash'
set -x
cp "$HOME/.bashrc" "$HOME/.bashrc-original"
cp "$script_dir/.bashrc" "$HOME/.bashrc"
cp "$script_dir/.bash_git" "$HOME/.bash_git"
cp "$script_dir/.inputrc" "$HOME/.inputrc"

if [[ "$SHELL" != "/bin/bash" ]]; then
    sudo chsh -s /bin/bash
fi
set +x
