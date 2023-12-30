const { loadFileStream } = require("../../filesystem/loadFile")

const ResourceStatus = {
    NONE: 0,
    LOADING: 1,
    STREAM_LOADED: 2
};

class ContentResolverService {
    constructor() {
        this.alreadyLoading = [];
        this.resourceState = {};
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