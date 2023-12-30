const { loadFileStream } = require("../../filesystem/loadFile")

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