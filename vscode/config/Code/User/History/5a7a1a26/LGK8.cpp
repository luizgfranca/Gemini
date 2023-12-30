#include "read-text-file.h"
#include <fstream>
#include <memory>
#include <string>

using namespace file_tools;

std::unique_ptr<std::string> read_text_file(std::string path) {
    std::ifstream file;
    file.open(path);

    if(file.is_open()) {
        std::string content;
        file >> content;
        return std::make_unique<std::string>(content);
    }

    return nullptr;
}