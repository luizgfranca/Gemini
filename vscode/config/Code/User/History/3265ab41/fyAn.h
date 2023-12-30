#include "controller//system-services-controller.h"
#include "glibmm/refptr.h"
#include "gtkmm/application.h"

namespace application {
    class SismApplication {
        Glib::RefPtr<Gtk::Application> m_gtk_application;

        controller::SystemServices m_system_services_controller;
    public:
        void run();
    };
}

