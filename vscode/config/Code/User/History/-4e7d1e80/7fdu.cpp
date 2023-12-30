#include "property-value-list-row.h"
#include "gtkmm/enums.h"

using namespace application::ui::component;

void PropertyValueListRow::setup_components() {
    set_child(m_content_box);
    m_content_box.append(m_property_label);
    m_content_box.append(m_value_label);
}

void PropertyValueListRow::setup_style() {
    m_value_label.set_halign(Gtk::Align::END);
}

void PropertyValueListRow::update_content() {
    m_property_label.set_text(m_property);
    m_value_label.set_text(m_value);
}


PropertyValueListRow::PropertyValueListRow(std::string initial_property_name, std::string initial_value) {
    m_property = initial_property_name;
    m_value = initial_value;

    setup_components();
    setup_style();
    update_content();
}


void PropertyValueListRow::set_property_name(std::string property_name) {
    m_property = property_name;
    update_content();
}

void PropertyValueListRow::set_value(std::string value) {
    m_value = value;
    update_content();
}