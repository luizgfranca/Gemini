#include "application/application.h"

int main(int argc, char **argv) {
    auto application = new application::SismApplication(argc, argv);
    application->run();
}
