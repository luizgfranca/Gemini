#include "../../provider/systemd/systemd-provider.h"

namespace module::services {

    // TODO: create service abstraction to be more platform agnostic
    class ServicesManager {
        provider::systemd::SystemdProvider m_systemd_provider;

        

    }

};