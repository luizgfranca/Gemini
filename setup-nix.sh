
set -e
#set -v
#set -x

echo "[Gemini] loading bash configuration"
if test -f "$HOME/.bashrc"; 
then 
	cp $HOME/.cbashrc $HOME/.cbashrc-bkp
fi;
cp .bashrc $HOME/.cbashrc
cp .bash_git $HOME/

echo "[Gemini] loading utility scripts"
cp -r bin $HOME

echo "[Gemini] installing vscode configFiles"
cp vscode/config/settings.json "$HOME/.config/Code/User/"
cp vscode/config/keybindings.json "$HOME/.config/Code/User/"
cp -r vscode/config/snippets "$HOME/.config/Code/User/"

echo "[Gemini] loading new configuration files"
sudo cp configuration.nix /etc/nixos/
sudo cp home-manager.nix /etc/nixos/

echo "[Gemini] rebuildig nixos and home-manager"
sudo nixos-rebuild switch

if type kwin_x11 >> /dev/null;
then 
	echo "[Gemini] Restarting user's KWin for configuration to take effect"
	nohup kwin_x11 --replace > /dev/null & 
	sleep 1
fi;

if type konsole >> /dev/null;
then 
	echo "[Gemini] installing konsole profile config files"
	cp -r konsole "$HOME/.local/share/"
fi;

echo "[Gemini] done";

