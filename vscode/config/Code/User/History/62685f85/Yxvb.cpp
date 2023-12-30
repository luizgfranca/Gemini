#include "system-services-manager.h"

using namespace module::services;

void SystemServicesManager::start_service(const provider::systemd::Unit& service) {
    m_systemd_provider.start_unit(service);
}