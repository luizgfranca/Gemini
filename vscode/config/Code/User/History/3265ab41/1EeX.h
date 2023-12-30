#include "controller//system-services-controller.h"
#include "glibmm/refptr.h"
#include "gtkmm/application.h"

namespace application {

    const std::string APPLICATION_ID = "io.github.luizgfranca.sism";

    class SismApplication {
        // BOILERPLATE
        int m_argc;
        char** m_argv;
        Glib::RefPtr<Gtk::Application> m_gtk_application;

        // LOGIC
        controller::SystemServices m_system_services_controller;

        // STATE
        std::shared_ptr<std::vector<provider::systemd::Unit>> m_system_services;
    public:
        SismApplication(int argc, char** argv);
        void run();
    };
}

