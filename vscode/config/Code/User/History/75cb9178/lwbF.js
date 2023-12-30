const peek = (name) => 
    new stream.Transform({
        objectMode: true,
        transform: (chunk, _, callback) => {
            console.log(name, chunk);
            callback(null, chunk)
        }
    })

module.exports = peek;