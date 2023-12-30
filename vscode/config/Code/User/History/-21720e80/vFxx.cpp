#include "title-header.h"

using namespace application::ui::component;


void TitleHeader::setup_components() {
    append(m_label_header_message);
}

void TitleHeader::setup_style() {
    
}

TitleHeader::TitleHeader(HeaderLevel header_level) {
    m_header_level = header_level;

    setup_components();
    setup_style();
}

void TitleHeader::set_title(std::string title) {

}