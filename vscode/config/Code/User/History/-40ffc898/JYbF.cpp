#include "service-property.h"
#include <string>

using namespace component;

void ServiceProperty::configure() {
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
    
}

ServiceProperty::ServiceProperty(std::string name, std::string value) {
    set_name(name);
    set_value(value);
}

