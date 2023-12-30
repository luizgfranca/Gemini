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
        if( save_metadata(create_metadata_def(0)) != SUCCESS ) {
            printf("failed to create metadata file\n");
            exit(1);
        }
    }
    
    event_record_node* l = read_new_events( read_metadata() );


    // while(1) {
    //     char* content = read_event_file(EVENT_FILE_PATH);
    //     if(content != NULL) {
    //         printf("%s\n", content);
    //     }
    //     sleep(1);
    // }

    return 0;
}