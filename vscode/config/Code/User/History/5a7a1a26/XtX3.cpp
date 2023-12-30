#include "read-text-file.h"
#include <fstream>

using namespace file_tools;

std::string read_text_file(std::string path) {
    std::ifstream file;
    file.open(path);
    
}