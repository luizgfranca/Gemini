#include "application.h"

using namespace application;

SismApplication() {
    
}

void SismApplication::run() {
    m_gtk_application = Gtk::Application::create(APPLICATION_ID);
}