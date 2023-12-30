#include "../common-imports.h"

#define FILE__SEEK_START(fp) (fseek(fp, 0, SEEK_SET))
#define FILE__SEEK_END(fp) (fseek(fp, 0, SEEK_END))

long file_size(FILE* fp);

char* file_read_data(FILE* fp) {
    long size = file_size(fp);
    char* buffer = malloc((size + 1) * sizeof(char));
    
    if(!fread(buffer, size, 1, fp)) {
        return NULL;
    }

    buffer[size] = '\0';

    return buffer;
}
