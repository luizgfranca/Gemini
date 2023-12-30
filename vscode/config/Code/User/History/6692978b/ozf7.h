#pragma once

#include "gtkmm/box.h"
#include "gtkmm/label.h"
#include "gtkmm/listbox.h"
#include "gtkmm/window.h"
#include "../title-header/title-header.h"

#include "../../../controller/system-services-controller.h"
#include "../property-value-list-row/property-value-list-row.h"

namespace application::ui::component {
    class ServiceDetailsSection : public Gtk::Box{
    private:
        TitleHeader m_serviceproperty_title;
        Gtk::Label m_serviceproperty_description;

        Gtk::ListBox m_property_listbox;
        PropertyValueListRow m_loaded_property_list_row;
        PropertyValueListRow m_state_property_list_row;
        PropertyValueListRow m_followed_property_list_row;
        PropertyValueListRow m_object_path_property_list_row;
        PropertyValueListRow m_job_type_property_list_row;
        PropertyValueListRow m_job_object_path_property_list_row;

        void setup_components();
        void setup_style();

        void configure();    
        
    public:
        ServiceDetailsSection();
        void set_service(provider::systemd::Unit service_unit);
    };
}
