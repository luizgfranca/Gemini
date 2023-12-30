OS_RELEASE=$(awk -F= '/^NAME/{print $2}' /etc/os-release)

if ["$OS_RELEASE" == "Fedora Linux"]; then
    
fi