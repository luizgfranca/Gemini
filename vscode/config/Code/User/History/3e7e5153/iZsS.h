#pragma once

#include "metadata-file.h"

#define EVENT_RECORD_LIST__HAS_NEXT(l) (l->next != NULL)
#define EVENT_RECORD_LIST__NEXT(l) (l = l->next)
#define EVENT_RECORD_LIST__ITERATE_TO_LAST(l) while(EVENT_RECORD_LIST__HAS_NEXT(l)) {EVENT_RECORD_LIST__NEXT(l);}

typedef 
    struct event_record_node {
        char* content;
        u_int32_t length;
        struct event_record_node* next;
    } 
event_record_node;

typedef event_record_node* event_record_ref;

event_record_ref* read_new_events(metadata* _metadata);
void print_event_record_list(event_record_ref* _first_node);