#include "system-services-controller.h"


using namespace application::controller;


void refresh();
void start(const provider::systemd::Unit& service);
void stop(const provider::systemd::Unit& service);
void restart(const provider::systemd::Unit& service);
std::shared_ptr<std::vector<provider::systemd::Unit>> get_services();