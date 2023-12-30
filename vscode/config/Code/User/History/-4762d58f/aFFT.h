#include <memory>
#include "../dbus/systemd/systemd-manager.h"

namespace provider::systemd {
    class SystemdProvider {
        std::shadbus::systemd::SystemdManager m_dbus_systemd_manager_interface;

    public:
        SystemdProvider();

    };
}

