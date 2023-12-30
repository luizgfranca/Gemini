#include "read-text-file.h"
#include <fstream>
#include <memory>

using namespace file_tools;

std::unique_ptr<std::string> read_text_file(std::string path) {
    std::ifstream file;
    file.open(path);

    if(file.is_open()) {

    }
}