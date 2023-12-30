#include "settings.h"

#include "system/file-utils.h"
#include "event-file.h"
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

int main() {
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



    event_record_ref* first_record_ref;

    while(1) {
        first_record_ref = read_new_events( meta );
        if(*first_record_ref == NULL) {
            printf("No new events registered\n");
            return 0;
        }

        sleep(POLL_INTERVAL_SECONDS);
    }
    

    print_event_record_list(first_record_ref);

    return 0;
}