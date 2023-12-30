#include "settings.h"

#include "system/file-utils.h"
#include "event-file.h"
#include <stdio.h>
#include <stdlib.h>

char* read_event_file(char* event_file_path) {
    FILE* event_file = fopen(event_file_path, "r");
    if(event_file == NULL) {
        printf("Event file %s not found\n", event_file_path);
        return NULL;
    }

    char* content = file__read_data(event_file);

    fclose(event_file);
    return content;
}


int main() {
    // if( save_metadata(create_metadata_def(1)) != SUCCESS ) {
    //     printf("failed to create metadata file\n");
    //     exit(1);
    // }

    // metadata* writen_metadata = read_metadata();
    // if(writen_metadata != NULL) {
    //     printf("current offset: %lu\n", writen_metadata->event_file_offset);
    // } else {
    //     printf("unable to read metadata\n");
    // }
    
    metadata* meta = read_metadata();
    
    if(meta == NULL) {
        if( save_metadata(create_metadata_def(0) ) != SUCCESS ) {
            printf("failed to create metadata file\n");
            exit(1);
        }

        meta = read_metadata();
        if(meta == NULL) {
            printf("failed metadata read after write\n");
            exit(1);
        }
    }

    printf("metadata: offset=%lu\n", meta->event_file_offset);

    event_record_ref* first_record_ref = malloc(sizeof(event_record_node*));

    first_record_ref = read_new_events( meta );
    if(*first_record_ref == NULL) {
        printf("No events registered\n");
    }

    print_event_record_list(first_record_ref);

    printf("END\n");

    // while(1) {
    //     char* content = read_event_file(EVENT_FILE_PATH);
    //     if(content != NULL) {
    //         printf("%s\n", content);
    //     }
    //     sleep(1);
    // }

    return 0;
}