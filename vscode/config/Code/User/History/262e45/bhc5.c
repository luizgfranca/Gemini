#include "common/common-types.h"
#include "metadata-file.h"
#include "settings.h"

op_result _open_metadata_file() {
    FILE* fp = fopen(METADATA_FILE_PATH, "r+");
    if(fp == NULL) {
        return OP_RESULT_FILE_NOT_FOUND;
    }

    return fp;
}

op_result _create_metadata_file() {

}


metadata* read_metadata() {

}

op_result update_metadata() {

}