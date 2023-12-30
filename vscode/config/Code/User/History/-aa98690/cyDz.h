#include "../common/common-imports.h"

#define FILE__SEEK_START(fp) (fseek(fp, 0, SEEK_SET))
#define FILE__SEEK_END(fp) (fseek(fp, 0, SEEK_END))

long file__size(FILE* fp);
char* file__read_data(FILE* fp);
