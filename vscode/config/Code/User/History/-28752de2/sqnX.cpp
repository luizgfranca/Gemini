#include "start-unit-mode.h"

using namespace provider::dbus::systemd::dto;

const std::string start_unit_mode_strs[] = {
    "replace",
    "fail",
    "isolate",
    "ignore-dependencies",
    "ignore-requirements"
};

std::string to_string(StartUnitMode mode) {
    
}