#pragma once

#include "gtkmm/window.h"

class ServiceDetailsTab : public Gtk::Window{
    ServiceDetailsTab(): builder(Gtk::Builder::create_)
};