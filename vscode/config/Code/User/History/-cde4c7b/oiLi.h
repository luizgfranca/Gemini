#include <gtkmm.h>

class PropertyKVListRow : public Gtk::ListBoxRow {
    std::string m_key;
    std::string m_value;

public:
    PropertyKVListRow(std::string initial_key = "", std::string initial_value = "");

};