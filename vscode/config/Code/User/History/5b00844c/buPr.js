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
            if(this.resourceState[relativePath].status === ResourceStatus.LOADING) {
                return;
            }

            this.ResourceStatus[relativePath] = {
                status: ResourceStatus.LOADING,
                stream: null
            };

            loadFileStream(relativePath, (relativePath, fileStream) => {
                this.alreadyLoading[relativePath] = false;
                callback(fileStream)
            }) 
        })
    }

}

module.exports = { ContentResolverService }