#include "property-value-list-row.h"

using namespace application::ui::component;

void PropertyValueListRow::setup_components() {
    
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