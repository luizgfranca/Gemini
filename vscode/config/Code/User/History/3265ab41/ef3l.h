#include "controller//system-services-controller.h"
#include "glibmm/refptr.h"
#include "gtkmm/application.h"

namespace application {
    class SismApplication {
        // BOILERPLATE
        Glib::RefPtr<Gtk::Application> m_gtk_application;

        // LOGIC
        controller::SystemServices m_system_services_controller;

        // STATE
        std::shared_ptr<std::vector<provider::systemd::Unit>> m_system_services;
    public:
        void run();
    };
}

