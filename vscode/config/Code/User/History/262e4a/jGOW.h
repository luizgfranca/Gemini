#include "common/common-types.h"
#include <sys/types.h>

typedef struct metadata {
    u_int64_t event_file_offset;
} metadata;

metadata* read_metadata();
op_result update_metadata();