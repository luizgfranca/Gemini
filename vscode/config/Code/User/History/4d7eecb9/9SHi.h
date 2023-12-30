#include "glibmm/refptr.h"
#include "gtkmm/cssprovider.h"


namespace application::ui::component::service_details {
    Glib::RefPtr<Gtk::CssProvider> get_style_provider();
}