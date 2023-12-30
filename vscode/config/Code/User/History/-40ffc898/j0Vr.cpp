#include "service-property.h"

using namespace component;

ServiceProperty::ServiceProperty(std::string name, std::string value) {
    set_name(name);
    set_value(value);
}