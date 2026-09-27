#!/bin/env bash
set -e

script_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"

if type dnf >/dev/null 2>&1; then
    echo "[Gemini] DNF system package manager detected"
    bash "$script_dir/dnf.sh"
elif type apt >/dev/null 2>&1; then
    echo "[Gemini] APT system package manager detected"
    bash "$script_dir/apt.sh"
elif type pacman >/dev/null 2>&1; then
    echo "[Gemini] Pacman system package manager detected"
    bash "$script_dir/pacman.sh"
else
    echo "[Gemini] No supported system package manager detected" >&2
    exit 1
fi
