#include "service-details-style.h"

using namespace application::ui::component::service_details;

Glib::RefPtr<Gtk::CssProvider> load_style_from_file() {
    auto style_provider = Gtk::CssProvider::create();
    style_provider->load_from_path("resources/service-details-section.css");
}


constexpr Glib::RefPtr<Gtk::CssProvider> get_style_provider() {

}