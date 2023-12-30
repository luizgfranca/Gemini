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

