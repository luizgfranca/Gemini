#include "metadata-file.h"
#include "settings.h"
#include "system/file-utils.h"
#include <assert.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>


#define READ_UINT64(fp, buffer) (fread(buffer, sizeof(u_int64_t), 1, fp))

FILE* _open_metadata_file(char mode[]) {
    FILE* fp = fopen(METADATA_FILE_PATH, mode);
    if(fp == NULL) {
        return NULL;
    }

    return fp;
}

metadata* create_metadata_def(u_int64_t _event_file_offset) {
    metadata* m = malloc(sizeof(metadata));
    m->event_file_offset = _event_file_offset;
    return m;
}

metadata* read_metadata() {
    FILE* fp = _open_metadata_file("rb");
    if(fp == NULL) {
        return NULL;
    }

    metadata* data = (metadata*) malloc(sizeof(metadata));

    FILE__SEEK_START(fp);
    FILE__READ(u_int64_t, fp, &data->event_file_offset);
    fclose(fp);

    return data;
}

op_result save_metadata(metadata* _m) {
    printf("save_metadata: offset=%lu\n", _m->event_file_offset);

    FILE* fp = _open_metadata_file("wb");
    if(fp == NULL) {
        return UNABLE_TO_OPEN_FILE;
    }

    assert(_m != NULL);

    FILE__SEEK_START(fp);
    FILE__WRITE(u_int64_t, fp, &_m->event_file_offset);
    fclose(fp);

    return SUCCESS;
}