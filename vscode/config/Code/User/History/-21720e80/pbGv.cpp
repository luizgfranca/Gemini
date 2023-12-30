#include "title-header.h"

using namespace application::ui::component;

void TitleHeader::setup_style() {

}

TitleHeader::TitleHeader(HeaderLevel headerLevel) {
    m_header_level = headerLevel
}

void set_title(std::string title);