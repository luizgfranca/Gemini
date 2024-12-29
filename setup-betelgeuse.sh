#!/bin/bash

set -e
set -v
set -x

echo "setting up fstab config"
sudo cp /etc/fstab /etc/fstab-original
sudo cp ./fstab /etc/fstab


