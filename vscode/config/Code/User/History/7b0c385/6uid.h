#include "gtkmm/box.h"
#include "gtkmm/label.h"

namespace application::ui::component {
    enum HeaderLevel {
        H3
    };

    class TitleHeader : public Gtk::Box {
        Gtk::Box m_header_container_box;
        
        HeaderLevel m_header_level;

        void setup_components();
        void setup_style();
    public:
        TitleHeader(HeaderLevel header_level = HeaderLevel::H3);
        void set_title(std::string title);
    };
}
