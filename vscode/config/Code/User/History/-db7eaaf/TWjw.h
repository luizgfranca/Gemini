#include "../module//services/system-services-manager.h"

namespace application::controller {
    class SystemServices {
        module::services::SystemServicesManager m_manager;
        
        std::unique_ptr<std::vector<provider::systemd::Unit>> m_services;
    };
}