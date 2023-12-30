#include "gtkmm/box.h"
#include "gtkmm/label.h"

namespace application::ui::component {
    enum HeaderLevel {
        H3
    };

    class TitleHeader : public Gtk::Box {
        HeaderLevel& m_header_level;

        void setup_style();
    public:
        TitleHeader(HeaderLevel headerLevel = HeaderLevel::H3);
        void set_title(std::string title);
    };
}
