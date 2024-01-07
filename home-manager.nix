
{ config, pkgs, ... }:
let
  home-manager = builtins.fetchTarball "https://github.com/nix-community/home-manager/archive/release-23.11.tar.gz";
  plasma-manager = builtins.fetchTarball "https://github.com/pjones/plasma-manager/archive/e9f464e016e3afa7b23f37b5e5e61216f964cbeb.tar.gz";
in
{
  imports = [
    (import "${home-manager}/nixos")
  ];

  nixpkgs = {
    config = {
      allowUnfree = true;
      allowUnfreePredicate = (pkg: true);
    };
  };
  home-manager.useGlobalPkgs = true;
  home-manager.users.luiz = {lib, ...}: {
    /* The home.stateVersion option does not have a default and must be set */
    imports = [
      (import "${plasma-manager}/modules")
    ];

    programs.plasma = {
      enable = true;
      workspace = {
        clickItemTo = "select";
        tooltipDelay = 5;
        theme = "breeze-dark";
        colorScheme = "BreezeDark";
      };     
      kwin.titlebarButtons = {
        left = [ "close" ];
        right = [ "more-window-actions" ];
      };
      shortcuts = {
        "kwin"."Switch One Desktop to the Left" = "Meta+Left";
        "kwin"."Switch One Desktop to the Right" = "Meta+Right"; 
        "kwin"."Window Quick Tile Left" = "Meta+Shift+Left";
        "kwin"."Window Quick Tile Right" = "Meta+Shift+Right";
	"kwin"."Window to Next Screen" = "Meta+Ctrl+Right";
        "kwin"."Window to Previous Screen" = "Meta+Ctrl+Left";
      };
      configFile."kwinrc"."Desktops"."Number" = 4; 
      configFile."kwinrc"."Desktops"."Rows" = 1;     
      configFile."kwinrc"."ModifierOnlyShortcuts"."Meta" = "org.kde.kglobalaccel,/component/kwin,,invokeShortcut,Overview";     
      configFile."ksmserverrc"."General"."loginMode" = "emptySession";
      configFile."kdeglobals"."General"."AccentColor" = "silver";
     
    };
    programs.bash = {
      enable = true;
      bashrcExtra = ''
        . ~/.cbashrc
      '';
    };
    programs.vscode = {
      enable = true;
      extensions = with pkgs.vscode-extensions; [
        eamodio.gitlens
        emmanuelbeziat.vscode-great-icons
        esbenp.prettier-vscode
        github.github-vscode-theme
        johnpapa.vscode-peacock
        ms-python.vscode-pylance
        ms-toolsai.jupyter
        ms-toolsai.jupyter-keymap
        ms-toolsai.jupyter-renderers
        ms-vscode.cpptools
        golang.go
        llvm-vs-code-extensions.vscode-clangd
        ms-python.python
        ms-python.vscode-pylance
        ms-vscode.cmake-tools
        twxs.cmake
        zxh404.vscode-proto3 
      ] ++ pkgs.vscode-utils.extensionsFromVscodeMarketplace [
        {
          name = "numbered-bookmarks";
          publisher = "alefragnani";
          version = "8.4.0";
          sha256 = "sha256-/1Q4EEB8MxWaMvEMdAWwGfgASMdLwvblIQBendiQISM=";
        }
        {
          name = "sema";
          publisher = "arzg";
          version = "1.12.1";
          sha256 = "sha256-GdybJA3G39F/alrrGruHhlQQ0KMx9IVATVagdw1oRvs=";
        }
        {
          name = "vsc-community-material-theme";
          publisher = "Equinusocio";
          version = "1.4.6";
          sha256 = "sha256-DVgyE9CAB7m8VzupUKkYIu3fk63UfE+cqoJbrUbdZGw=";
        }
      ];
    };


    home.stateVersion = "23.11";
    home.activation = {
      restartkwin = lib.hm.dag.entryAfter ["writeBoundary"] ''
        echo "restarting kwin for configurations to take effect"
        nohup kwin_x11 --replace &
      ''; 
    };
    /* Here goes the rest of your home-manager config, e.g. home.packages = [ pkgs.foo ]; */
  };
}
