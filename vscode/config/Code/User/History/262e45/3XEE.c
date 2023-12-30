#include "common/common-types.h"
#include "metadata-file.h"
#include "settings.h"
#include "system/file-utils.h"
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>


#define READ_UINT64(fp, buffer) (fread(buffer, sizeof(u_int64_t), 1, fp))

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

    metadata* data = (metadata*) malloc(sizeof(metadata));

    FILE__SEEK_START(fp);
    FILE__READ(u_int64_t, fp, &data->event_file_offset);
    fclose(fp);

    return data;
}

op_result update_metadata(metadata* _new) {
    FILE* fp = _open_metadata_file();
    if(fp == NULL) {
        return NULL;
    }


}