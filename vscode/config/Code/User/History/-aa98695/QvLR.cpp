#include "file-utils.h"

long file_size(FILE* fp) {
    FILE__SEEK_END(fp);
    long size = ftell(fp);
    FILE__SEEK_START(fp);

    return size;
}

char* file_read_data(FILE* fp) {
    long size = file_size(fp);
    char* buffer = malloc((size + 1) * sizeof(char));
    
    if(!fread(buffer, size, 1, fp)) {
        return NULL;
    }

    buffer[size] = '\0';

    return buffer;
}