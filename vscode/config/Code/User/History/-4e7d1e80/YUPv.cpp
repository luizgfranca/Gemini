#include "property-value-list-row.h"

using namespace application::ui::component;

PropertyValueListRow::PropertyValueListRow(std::string initial_property_name, std::string initial_value) {
    m_property = initial_property_name;
    m_value = initial_value;

    setup_components();
    setup_style();
}