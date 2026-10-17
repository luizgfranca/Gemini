#!/bin/env bash
set -e

if ! type sdk >/dev/null 2>&1; then
    echo "[Gemini] installing sdkman"
    set -x
    curl -s "https://get.sdkman.io" | bash
    source "$HOME/.sdkman/bin/sdkman-init.sh"
    set +x
fi
