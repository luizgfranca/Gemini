#include "settings.h"

#include "system/file-utils.h"
#include "metadata-file.h"
#include <stdio.h>

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

    metadata* metadata = read_metadata();

    if(metadata != NULL) {
        printf("current offset: %lu", metadata->event_file_offset);
    }
    

    // while(1) {
    //     char* content = read_event_file(EVENT_FILE_PATH);
    //     if(content != NULL) {
    //         printf("%s\n", content);
    //     }
    //     sleep(1);
    // }

    return 0;
}