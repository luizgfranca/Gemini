#include "systemd-provider.h"
#include <memory>

using namespace provider::systemd;

SystemdProvider::SystemdProvider() {
    m_dbus_systemd_manager_interface = std::make_unique<dbus::systemd::SystemdManager>();
}

SystemdProvider::start_unit(Unit unit) {
    
}