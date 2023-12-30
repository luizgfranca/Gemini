const { loadFile } = require("../../filesystem/loadFile")

class ContentResolverService {
    constructor() {
        this.alreadyLoading = [];
    }

    resolve(relativePath, callback) {        
        setImmediate(() => { 
            if(this.alreadyLoading[relativePath])
                return;

            this.alreadyLoading[relativePath] = true;

            loadFile(relativePath, (relativePath, data) => {
                this.alreadyLoading[relativePath] = false;
                callback(data)
            }) 
        })
    }

}

module.exports = { ContentResolverService }