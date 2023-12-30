#include "../module//services/system-services-manager.h"

namespace application::controller {
    class SystemServices {
        // TOOD: Use dependency injection
        module::services::SystemServicesManager m_manager;

        std::shared_ptr<std::vector<provider::systemd::Unit>> m_services;

    public:
        void refresh();
        std::shared_ptr<std::vector<provider::systemd::Unit>> get_services();
        
    };
}