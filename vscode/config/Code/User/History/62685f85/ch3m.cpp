#include "system-services-manager.h"

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
    
    for(const auto unit : *units) {
        unit.name
    }
}