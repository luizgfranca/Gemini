#include "service-property.h"
#include "gtkmm/enums.h"
#include <string>

using namespace component;

void ServiceProperty::configure() {
    // m_name_label.set_expand(true);
    m_name_label.set_justify(Gtk::Justification::RIGHT);
    // m_name_label.set_halign(Gtk::Align::FILL);
    // m_name_label.set_wrap(false);
    
    // m_value_label.set_expand(true);
    m_value_label.set_justify(Gtk::Justification::LEFT);
    // m_value_label.set_halign(Gtk::Align::FILL);
    // m_value_label.set_wrap(false);

    set_vexpand(false);

    append(m_name_label);
    append(m_value_label);
}

void ServiceProperty::set_name(std::string name) {
    m_name_label.set_label(name);
}

void ServiceProperty::set_value(std::string value) {
    m_value_label.set_label(value);
}

ServiceProperty::ServiceProperty() {
    configure();
}

ServiceProperty::ServiceProperty(std::string name, std::string value) {
    configure();
    set_name(name);
    set_value(value);
}

