
void file_nav_to_start(FILE* fp) {
    fseek(fp, 0, SEEK_SET);
}

void file_nav_to_end(FILE* fp) {
    fseek(fp, 0, SEEK_END);
}

long file_size(FILE* fp) {
    file_nav_to_end(fp);
    long size = ftell(fp);
    file_nav_to_start(fp);

    return size;
}

char* file_read_data(FILE* fp) {
    long size = file_size(fp);
    char* buffer = malloc((size + 1) * sizeof(char));
    
    if(!fread(buffer, size, 1, fp)) {
        return NULL;
    }

    buffer[size] = '\0';

    return buffer;
}
