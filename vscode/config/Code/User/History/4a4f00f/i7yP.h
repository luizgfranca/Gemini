#include <string>
namespace provider::dbus::systemd {
    const std::string DBUS_SYSTEMD_MANAGER_LIST_UNITS_METHOD = "ListUnits";
    const std::string DBUS_SYSTEMD_MANAGER_STOP_UNIT_METHOD = "StopUnit";
    const std::string DBUS_SYSTEMD_MANAGER_START_UNIT_METHOD = "StartUnit";
    const std::string DBUS_SYSTEMD_MANAGER_RELOAD_OR_RESTART_UNIT_METHOD = "ReloadOrRestartUnit";
}