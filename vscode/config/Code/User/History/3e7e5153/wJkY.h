#include "metadata-file.h"

typedef struct event_record_node {
    char* content;
    u_int32_t length;
    event_record_node* next;
} event_record_node;

char** read_events(metadata* _metadata);