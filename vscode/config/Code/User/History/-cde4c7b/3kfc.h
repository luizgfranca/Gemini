#include <gtkmm.h>

class PropertyValueListRow : public Gtk::ListBoxRow {
    std::string m_property;
    std::string m_value;

    void setup_components();
    void setup_style();
public:
    PropertyValueListRow(std::string initial_property_name = "", std::string initial_value = "");
    
};