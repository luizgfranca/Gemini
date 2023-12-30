#include "../../provider/systemd/systemd-provider.h"

namespace module::services {

    // TODO: create service abstraction to be more platform agnostic
    class ServicesManager {
        provider::systemd::SystemdProvider m_systemd_provider;

        std::unique_ptr<std::vector<provider::systemd::Unit>> get_services_list();
        void start_unit(const provider::systemd::Unit& unit);
        void stop_unit(const provider::systemd::Unit& unit);
        void reload_or_restart_unit(const provider::systemd::Unit& unit);

    }

};