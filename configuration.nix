# Edit this configuration file to define what should be installed on
# your system.  Help is available in the configuration.nix(5) man page
# and in the NixOS manual (accessible by running ‘nixos-help’).

{ config, pkgs, ... }:

{
  imports =
    [ # Include the results of the hardware scan.
      ./hardware-configuration.nix
      ./home-manager.nix
    ];


  system.copySystemConfiguration = true;
  # Bootloader.
  boot.loader.systemd-boot.enable = true;
  boot.loader.efi.canTouchEfiVariables = true;

  boot.supportedFilesystems = [ "ntfs" ];
  fileSystems."/data" = {
    device = "/dev/sda1";
    fsType = "ntfs-3g";
    options = [ "rw" ];
  };


  networking.hostName = "nixos"; # Define your hostname.
#  networking.wireless.enable = true;  # Enables wireless support via wpa_supplicant.
#  networking.wireless.networks = {
#    "LUIZ 5G" = {
#      pskRaw = "169edaa710fc3e79303622e1dc87632ff89f4c14525fd43d3e3bc0a54d9b16e5";
#    };
#  };

  # Configure network proxy if necessary
  # networking.proxy.default = "http://user:password@proxy:port/";
  # networking.proxy.noProxy = "127.0.0.1,localhost,internal.domain";

  # Enable networking
  networking.networkmanager.enable = true;
#  networking.networkmanager.unmanaged = [
#    "LUIZ 5G"
#  ];

  # Set your time zone.
  time.timeZone = "America/Sao_Paulo";

  # Select internationalisation properties.
  i18n.defaultLocale = "en_US.UTF-8";

  i18n.extraLocaleSettings = {
    LC_ADDRESS = "pt_BR.UTF-8";
    LC_IDENTIFICATION = "pt_BR.UTF-8";
    LC_MEASUREMENT = "pt_BR.UTF-8";
    LC_MONETARY = "pt_BR.UTF-8";
    LC_NAME = "pt_BR.UTF-8";
    LC_NUMERIC = "pt_BR.UTF-8";
    LC_PAPER = "pt_BR.UTF-8";
    LC_TELEPHONE = "pt_BR.UTF-8";
    LC_TIME = "pt_BR.UTF-8";
  };

  # Enable the X11 windowing system.
  services.xserver.enable = true;

  # Enable the KDE Plasma Desktop Environment.
  services.xserver.displayManager.sddm.enable = true;
  services.xserver.desktopManager.plasma5.enable = true;

  # Configure keymap in X11
  services.xserver = {
    layout = "br";
    xkbVariant = "";
  };

  # Configure console keymap
  console.keyMap = "br-abnt2";

  # Enable CUPS to print documents.
  services.printing.enable = true;

  # Enable sound with pipewire.
  sound.enable = true;
  hardware.pulseaudio.enable = false;
  security.rtkit.enable = true;
  services.pipewire = {
    enable = true;
    alsa.enable = true;
    alsa.support32Bit = true;
    pulse.enable = true;
    # If you want to use JACK applications, uncomment this
    #jack.enable = true;

    # use the example session manager (no others are packaged yet so this is enabled by default,
    # no need to redefine it in your config for now)
    #media-session.enable = true;
  };

  services.flatpak.enable = true;

  virtualisation.docker = {
    enable = true;
    rootless = {
      enable = true;
      setSocketVariable = true;
    };
  };

  virtualisation.podman.enable = true;


  # Enable touchpad support (enabled default in most desktopManager).
  # services.xserver.libinput.enable = true;

  # Define a user account. Don't forget to set a password with ‘passwd’.
  users.users.luiz = {
    isNormalUser = true;
    description = "Luiz";
    extraGroups = [ "networkmanager" "wheel" ];
    packages = with pkgs; [
    #  thunderbird
    ];
  };
  users.users.luizgfranca = {
    isNormalUser = true;
    description = "Luiz França";
    extraGroups = [ "networkmanager" ];
    home = "/home/luizgfranca";
    packages = with pkgs; [
    #  thunderbird
    ];
  };


  # Allow unfree packages
  nixpkgs.config.allowUnfree = true;

  # List packages installed in system profile. To search, run:
  # $ nix search wget
  environment.systemPackages = with pkgs; [
  #  vim # Do not forget to add an editor to edit configuration.nix! The Nano editor is also installed by default.
  #  wget
    git
    distrobox
    firefox
    kate
    neovim
    vlc
    vscode
    (vscode-with-extensions.override {
      vscodeExtensions = with vscode-extensions; [
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
  })
 ];


  # Some programs need SUID wrappers, can be configured further or are
  # started in user sessions.
  # programs.mtr.enable = true;
  # programs.gnupg.agent = {
  #   enable = true;
  #   enableSSHSupport = true;
  # };

  # List services that you want to enable:

  # Enable the OpenSSH daemon.
  # services.openssh.enable = true;

  # Open ports in the firewall.
  # networking.firewall.allowedTCPPorts = [ ... ];
  # networking.firewall.allowedUDPPorts = [ ... ];
  # Or disable the firewall altogether.
  # networking.firewall.enable = false;

  # This value determines the NixOS release from which the default
  # settings for stateful data, like file locations and database versions
  # on your system were taken. It‘s perfectly fine and recommended to leave
  # this value at the release version of the first install of this system.
  # Before changing this value read the documentation for this option
  # (e.g. man configuration.nix or on https://nixos.org/nixos/options.html).
  system.stateVersion = "23.11"; # Did you read the comment?

  system.activationScripts = {
    flathub = ''
      echo "forcing /bin/bash"
      ln -s /run/current-system/sw/bin/bash /bin/bash

      echo "setting up flathub"
      /run/current-system/sw/bin/flatpak remote-add --system --if-not-exists flathub https://dl.flathub.org/repo/flathub.flatpakrepo
    '';
  };
}

