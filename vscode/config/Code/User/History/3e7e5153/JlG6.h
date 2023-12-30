#include "metadata-file.h"

typedef 
    struct event_record_node {
        char* content;
        u_int32_t length;
        struct event_record_node* next;
    } 
event_record_node;

event_record_node* read_new_events(metadata* _metadata);
void print_event_record_list(event_record_node* _first_node);