#include "event-file.h"
#include "settings.h"
#include <assert.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/types.h>
#include "system/file-utils.h"

#define EVENT_SEPARATOR ';'

#define EVENT_BUFFER_SIZE 65536

#define _OPEN_EVENT_FILE(mode) (fopen(EVENT_FILE_PATH, mode))

#define _SEEK_METADATA_OFFSET(fp, metadata) (fseek(fp, metadata->event_file_offset, SEEK_SET))

#define _BUFFER_CREATE() ((char*) malloc(EVENT_BUFFER_SIZE * sizeof(char)))
#define _BUFFER_RESET(buffer) (memset(buffer, 0, EVENT_BUFFER_SIZE))
#define _BUFFER_PUT(buff, c, index) (buff[index] = c)

#define _EVENT_RECORD_LIST__HAS_NEXT(l) (l->next != NULL)
#define _EVENT_RECORD_LIST__NEXT(l) (l = l->next)

void _event_record_list__foreach(event_record_node* first, void (*fn)(event_record_node*)) {
    assert(first != NULL);
    printf("_event_record_list__foreach\n");
    event_record_node* it = first;
    while(it != NULL) {
        fn(it);
        assert(it != NULL);
        if(it->next != NULL)
            _EVENT_RECORD_LIST__NEXT(it);
    }
}

char* _get_buffer_content(char* _buff, u_int16_t _len) {
    char* ret = malloc((_len + 1) * sizeof(char));

    for(int i = 0; i < _len; i ++) {
        ret[i] = _buff[i];
    }

    ret[_len] = '\0';

    return ret;
}

event_record_node* _create_new_event_record(char* _buff, u_int16_t _len) {
    event_record_node* e = malloc(sizeof(event_record_node));
    e->content = _get_buffer_content(_buff, _len);
    e->length = _len + 1;

    return e;
}

event_record_node* _create_list_with_first_element(char* _buff, u_int16_t _len) {
    return _create_new_event_record(_buff, _len);
}

void _append_record(event_record_node* _curr, char* _buff, u_int16_t _len) {
    event_record_node* new = _create_new_event_record(_buff, _len);
    _curr->next = new;
}

void _event_record__print(event_record_node* _node) {
    printf("event_record: %s\n", _node->content);
}

void print_event_record_list(event_record_ref* _first_node) {
    printf("print_event_record_list\n");
    _event_record_list__foreach(*_first_node, _event_record__print);
}

event_record_ref* read_new_events(metadata* _metadata) {
    FILE* fp = _OPEN_EVENT_FILE("r"); 
    if(fp == NULL) {return NULL;}

    printf("metadata_offset: %lu\n", _metadata->event_file_offset);
    printf("file openned: size=%lu bytes \n", file__size(fp));

    int res = _SEEK_METADATA_OFFSET(fp, _metadata);
    assert(res != -1);

    static event_record_node* list_first_node = NULL;
    static event_record_node* list_curr_node = NULL;

    u_int64_t curr_offset = 0;
    char* buffer = _BUFFER_CREATE();
    char c;
    while((c = (char) fgetc(fp)) > 0) {
        assert(c != EOF);
        printf("c: %c (%d)\n", c, (int) c);
        printf("curr_offfset: %lu\n", curr_offset);

        switch (c) {
            case EVENT_SEPARATOR:
                if(list_curr_node == NULL) {
                    list_first_node = _create_list_with_first_element(buffer, curr_offset);
                } else {
                    _append_record(list_curr_node, 
                            buffer, 
                            curr_offset
                        );
                    assert(list_curr_node != NULL);
                    
                    list_first_node = list_curr_node;
                    _EVENT_RECORD_LIST__NEXT(list_curr_node);
                    assert(list_curr_node != NULL);
                }

                _metadata->event_file_offset += curr_offset;
                save_metadata(_metadata);
                
                curr_offset = 0;
                _BUFFER_RESET(buffer);
                break;
            
            case '\n':
            case '\0':
            case '\t':
                printf("SPECIAL CHARACTER\n");
                break;
            
            default:
                printf("NORMAL CHARACTER\n");
                assert(curr_offset < EVENT_BUFFER_SIZE);
                _BUFFER_PUT(buffer, c, curr_offset);
                break;
        }

        curr_offset ++;
    }

    printf("returning list\n");
    return &list_first_node;
}
