#!/bin/env bash
set -euo pipefail

export NVM_DIR="${XDG_CONFIG_HOME:+$XDG_CONFIG_HOME/nvm}"
if [[ -z "$NVM_DIR" ]]; then
    NVM_DIR="$HOME/.nvm"
    export NVM_DIR
fi

if [[ ! -s "$NVM_DIR/nvm.sh" ]]; then
    nvm_tag="$(curl -fsSL https://api.github.com/repos/nvm-sh/nvm/releases/latest | jq -er '.tag_name')"
    echo "[Gemini] Installing NVM $nvm_tag"
    curl -fsSL "https://raw.githubusercontent.com/nvm-sh/nvm/${nvm_tag}/install.sh" | bash

    echo "[Gemini] setting-up latest node version"
    # Load NVM directly so this script can use it immediately.
    source "$NVM_DIR/nvm.sh"
    nvm install node
    npm install -g yarn
    npm install -g typescript-language-server
fi
