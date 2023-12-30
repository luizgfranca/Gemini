#include "gtkmm/box.h"
#include "gtkmm/label.h"
#include <string>

namespace component {

    class ServiceProperty : public Gtk::Box {
        Gtk::Label m_name_label;
        Gtk::Label m_value_label;

        public:
            ServiceProperty();
            void set_name(std::string name);
            void set_value(std::string value);
    };

}

