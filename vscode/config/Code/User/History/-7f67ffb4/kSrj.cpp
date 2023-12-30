#include "system-services-controller.h"


using namespace application::controller;


void SystemServices::refresh() {
    m_services = m_manager.get_services_list();
}

void SystemServices::start(const provider::systemd::Unit& service) {
    m_manager.start_service(service);
}

void SystemServices::stop(const provider::systemd::Unit& service) {
    m_manager.stop_service(service);
}

void SystemServices::restart(const provider::systemd::Unit& service) {
    m_manager.restart_service(service);
}

std::shared_ptr<std::vector<provider::systemd::Unit>> SystemServices::get_services() {
    if(!m_services) {
        refresh();
    }

    return m_services;
}