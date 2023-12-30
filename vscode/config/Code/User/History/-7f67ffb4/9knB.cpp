#include "system-services-controller.h"


using namespace application::controller;


void SystemServices::refresh() {
    m_services = m_manager.get_services_list();
}

void SystemServices::start(const provider::systemd::Unit& service) {

}

void SystemServices::stop(const provider::systemd::Unit& service) {

}

void SystemServices::restart(const provider::systemd::Unit& service) {

}

std::shared_ptr<std::vector<provider::systemd::Unit>> SystemServices::get_services() {

}