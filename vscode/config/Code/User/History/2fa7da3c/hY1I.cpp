#include "application.h"

using namespace application;

void SismApplication::run() {
    m_gtk_application = Gtk::Application::create(APPLICATION_ID);
}