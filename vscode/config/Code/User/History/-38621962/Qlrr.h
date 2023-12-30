#include "../../provider/systemd/systemd-provider.h"

namespace module::services {

    // TODO: create service abstraction to be more platform agnostic
    class ServicesManager {
        provider::systemd::SystemdProvider m_systemd_provider;

        std::unique_ptr<std::vector<provider::systemd::Unit>> get_services_list();
        void start_service(const provider::systemd::Unit& service);
        void stop_service(const provider::systemd::Unit& service);
        void restart_service(const provider::systemd::Unit& service);
    }

};