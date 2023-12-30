#include "common/common-types.h"
#include "metadata-file.h"
#include "settings.h"
#include <stdio.h>

FILE* _open_metadata_file() {
    FILE* fp = fopen(METADATA_FILE_PATH, "r+");
    if(fp == NULL) {
        return NULL;
    }

    return fp;
}

op_result _create_metadata_file() {
    
}


metadata* read_metadata() {

}

op_result update_metadata() {

}