#include "file-utils.h"

long file_size(FILE* fp) {
    FILE__SEEK_END(fp);
    long size = ftell(fp);
    FILE__SEEK_START(fp);

    return size;
}