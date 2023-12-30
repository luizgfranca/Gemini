#include "controller//system-services-controller.h"
#include "glibmm/refptr.h"
#include "gtkmm/application.h"

namespace application {
    class SismApplication {
        Glib::RefPtr<Gtk::Application> m_gtk_application;

        controller::SystemServices m_system_services_controller;

        std::shared_ptr<std::vector<provider::systemd::Unit>> m_system_services;
    public:
        void run();
    };
}

