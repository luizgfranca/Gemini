#include "file-utils.h"

long file__size(FILE* _fp) {
    FILE__SEEK_END(_fp);
    long size = ftell(_fp);
    FILE__SEEK_START(_fp);

    return size;
}

char* file__read_data(FILE* _fp) {
    long size = file__size(_fp);
    char* buffer = (char*) malloc((size + 1) * sizeof(char));
    
    if(!fread(buffer, size, 1, _fp)) {
        return NULL;
    }

    buffer[size] = '\0';

    return buffer;
}