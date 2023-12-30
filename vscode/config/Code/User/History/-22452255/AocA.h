#include <string>
#include <memory>

namespace file_tools {
    std::unique_ptr<std::string> read_text_file(std::string path);
}