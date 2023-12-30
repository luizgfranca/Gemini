#include "controller//system-services-controller.h"
#include "glibmm/refptr.h"
#include "gtkmm/application.h"

namespace application {
    class SismApplication {
        controller::SystemServices m_system_services_controller;
        Glib::RefPtr<Gtk::Application> m_gtk_application;
    public:
        void run();
    };
}

