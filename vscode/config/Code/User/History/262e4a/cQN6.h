#pragma once

#include "common/common-types.h"

typedef struct metadata {
    u_int64_t event_file_offset;
} metadata;

metadata* create_metadata_def(u_int64_t _event_file_offset);

metadata* read_metadata();
op_result save_metadata(metadata* _m);