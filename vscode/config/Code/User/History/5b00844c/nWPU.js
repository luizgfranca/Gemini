const { loadFileStream } = require("../../filesystem/loadFile")

const ResourceStatus = {
    NONE: 0,
    LOADING: 1,
    STREAM_LOADED: 2
};

class ContentResolverService {
    constructor() {
        this.resourceState = {};
    }

    resolve(relativePath, callback) {        
        setImmediate(() => { 
            if(
                this.resourceState[relativePath] 
                && this.resourceState[relativePath].status === ResourceStatus.LOADING
            ) {
                return;
            }

            this.resourceState[relativePath] = {
                status: ResourceStatus.LOADING,
                stream: null
            };

            loadFileStream(relativePath, (relativePath, fileStream) => {
                this.resourceState[relativePath] = {
                    status: ResourceStatus.STREAM_LOADED,
                    stream: fileStream
                };

                if(fileStream != null) {
                    fileStream.on('end', () => 
                        this.resourceState[relativePath] = {
                            status: ResourceStatus.NONE,
                            stream: null
                        }
                    )
                }

                callback(fileStream)
            }) 
        })
    }

}

module.exports = { ContentResolverService }