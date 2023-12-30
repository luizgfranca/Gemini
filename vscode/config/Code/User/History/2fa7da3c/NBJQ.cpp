#include "application.h"

using namespace application;

SismApplication::SismApplication(int argc, char** argv) {
    m_argc = argc;
    m_argv = argv;
    
    m_gtk_application = Gtk::Application::create(APPLICATION_ID);
}

void SismApplication::run() {
    
}