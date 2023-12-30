#include "../../provider/systemd/systemd-provider.h"

namespace module::services {

    // TODO: create service abstraction to be more platform agnostic
    class ServicesManager {
        provider::systemd::SystemdProvider m_systemd_provider;

        std::unique_ptr<std::vector<Unit>> list_units();
        void start_unit(const Unit& unit);
        void stop_unit(const Unit& unit);
        void reload_or_restart_unit(const Unit& unit);

    }

};