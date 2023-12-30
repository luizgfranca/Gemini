#include "system-services-manager.h"
#include <utility>

using namespace module::services;

void SystemServicesManager::start_service(const provider::systemd::Unit& service) {
    m_systemd_provider.start_unit(service);
}

void SystemServicesManager::stop_service(const provider::systemd::Unit& service) {
    m_systemd_provider.stop_unit(service);
}

void SystemServicesManager::restart_service(const provider::systemd::Unit& service) {
    m_systemd_provider.reload_or_restart_unit(service);
}

std::unique_ptr<std::vector<provider::systemd::Unit>> SystemServicesManager::get_services_list() {
    auto units = m_systemd_provider.list_units();
    std::vector<provider::systemd::Unit> services;

    for(const auto unit : *units) {
        if(unit.name.ends_with(".service")) {
            services.push_back(unit);
        }
    }

    return std::move( std::make_unique<std::vector<provider::systemd::Unit>>(services) );
}