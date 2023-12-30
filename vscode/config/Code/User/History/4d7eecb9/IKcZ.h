#include "glibmm/refptr.h"
#include "gtkmm/cssprovider.h"


namespace application::ui::component::service_details {
    constexpr Glib::RefPtr<Gtk::CssProvider> get_style_provider();
}