

#include "gtkmm/box.h"
#include <string>
class ServiceProperty : public Gtk::Box {
public:
    ServiceProperty();
    void set_name(std::string name);
    void set_value(std::string value);
};