#include "service-property.h"
#include <string>

using namespace component;

ServiceProperty::ServiceProperty(std::string name, std::string value) {
    set_name(name);
    set_value(value);
}

void ServiceProperty::set_name(std::string name) {
    
}