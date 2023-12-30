#include "service-property.h"
#include "cairomm/fontoptions.h"
#include "gtkmm/enums.h"
#include <string>

using namespace component;

void ServiceProperty::configure() {
    // m_name_label.set_hexpand(true);
    // m_name_label.set_justify(Gtk::Justification::RIGHT);
    // m_name_label.set_halign(Gtk::Align::CENTER);
    // m_name_label.set_halign(Gtk::Align::FILL);
    // m_name_label.set_wrap(false);
    m_name_label.set_margin_start(10);
    m_name_label.set_font_options(Cairo::FontOptions::)
    
    // m_value_label.set_expand(true);
    // m_value_label.set_justify(Gtk::Justification::LEFT);
    m_value_label.set_margin_start(10);
    // m_value_label.set_halign(Gtk::Align::FILL);
    // m_value_label.set_wrap(false);

    set_vexpand(false);

    append(m_name_label);
    append(m_value_label);
}

void ServiceProperty::set_name(std::string name) {
    m_name_label.set_markup("<b>" + name + "</b>");
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

