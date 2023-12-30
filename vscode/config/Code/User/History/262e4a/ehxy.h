#include "common/common-types.h"

typedef struct metadata {
    u_int64_t event_file_offset;
} metadata;

metadata* create_metadata(u_int64_t event_file_offset);

metadata* read_metadata();
op_result save_metadata(metadata* _new);