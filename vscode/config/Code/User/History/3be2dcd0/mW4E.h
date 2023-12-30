#include <iostream>
#include <string>
#include <format>

namespace module::logger {
    template<typename... T>
    void log(std::format_string<T...> __fmt, T&&... __args) {
        std::cout << std::format(__fmt, __args...) + "\n";
    }
}