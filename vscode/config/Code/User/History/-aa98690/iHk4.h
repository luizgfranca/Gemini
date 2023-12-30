#include "../common/common-imports.h"

#define FILE__SEEK_START(fp) (fseek(fp, 0, SEEK_SET))
#define FILE__SEEK_END(fp) (fseek(fp, 0, SEEK_END))

#define FILE__READ_UINT64(fp, buffer) (fread(buffer, sizeof(u_int64_t), 1, fp))

long file__size(FILE* fp);
char* file__read_data(FILE* fp);
