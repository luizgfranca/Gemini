#include "application/application.h"
#include <cstdlib>

int main(int argc, char **argv) {
    auto application = new application::SismApplication(argc, argv);
    application->run();

    free(application);

    return 0;
}
