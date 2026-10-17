#!/bin/env bash
set -e

if ! type rustup >/dev/null 2>&1; then
    echo "[Gemini] Installing Rust with rustup"
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
fi

export PATH="$HOME/.cargo/bin:$PATH"

rustup default stable
rustup component add rust-analyzer
