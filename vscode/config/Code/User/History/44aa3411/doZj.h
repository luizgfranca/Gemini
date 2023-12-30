#include <string>
#include <algorithm>

std::string str_toupper(std::string s)
{
    std::transform(s.begin(), s.end(), s.begin(), 
        [](unsigned char c){ return std::toupper(c); }
    );
    return s;
}
