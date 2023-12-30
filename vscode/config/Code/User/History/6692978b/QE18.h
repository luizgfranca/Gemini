#pragma once

#include "gtkmm/box.h"
#include "gtkmm/window.h"

class ServiceDetailsSection : public Gtk::Box{
private:
    void configure();    
    
public:
    ServiceDetailsSection();
    void set_service(provider::systemd::Unit service_unit)

};