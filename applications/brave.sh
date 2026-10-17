#!/bin/env bash
set -e

if ! type brave-browser >/dev/null 2>&1; then
    echo "[Gemini] Installing Brave Browser"
    curl -fsS https://dl.brave.com/install.sh | sh
fi
