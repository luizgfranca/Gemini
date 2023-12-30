const { loadFileStream } = require("../../filesystem/loadFile")

const ResourceState = {
    NONE: 0,
    LOADING: 1,
    STREAM_LOADED: 2
};

class ContentResolverService {
    constructor() {
        this.alreadyLoading = [];

    }

    resolve(relativePath, callback) {        
        setImmediate(() => { 
            if(this.alreadyLoading[relativePath])
                return;

            this.alreadyLoading[relativePath] = true;

            loadFileStream(relativePath, (relativePath, fileStream) => {
                this.alreadyLoading[relativePath] = false;
                callback(fileStream)
            }) 
        })
    }

}

module.exports = { ContentResolverService }