#include <gtkmm.h>

class PropertyValueListRow : public Gtk::ListBoxRow {
    std::string m_property;
    std::string m_value;

public:
    PropertyValueListRow(std::string initial_key = "", std::string initial_value = "");

};