#include "common/common-types.h"
#include "metadata-file.h"
#include "settings.h"
#include "system/file-utils.h"


FILE* _open_metadata_file() {
    FILE* fp = fopen(METADATA_FILE_PATH, "r+");
    if(fp == NULL) {
        return NULL;
    }

    return fp;
}

metadata* read_metadata() {
    FILE* fp = _open_metadata_file();
    if(fp == NULL) {
        return NULL;
    }

    FILE__SEEK_START(fp);
    

}

op_result update_metadata() {

}