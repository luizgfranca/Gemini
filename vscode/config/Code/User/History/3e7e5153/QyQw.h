#include "metadata-file.h"

typedef struct event_record_node {
    char* content;
    u_int32_t length;
    event_record_node* next;
} event_record_node;

event_record_node* read_events(metadata* _metadata);