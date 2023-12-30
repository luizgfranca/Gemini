#include <iostream>
#include <string>
#include <format>

namespace module::logger {
    template<typename... T>
    void debug(std::format_string<T...> __fmt, T&&... __args) {
        std::cout << "[DEBUG]" + std::format( __fmt, __args...) + "\n";
    }
}