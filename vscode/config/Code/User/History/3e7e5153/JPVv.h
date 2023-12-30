#include "metadata-file.h"
#include <sys/types.h>

typedef struct event_record {
    char* content;
    u_int32_t length;
} event_record;

char** read_events(metadata* _metadata);