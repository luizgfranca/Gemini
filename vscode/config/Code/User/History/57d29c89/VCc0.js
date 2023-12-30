const stream = require('stream');

const toString = (object) => new Promise(
    (resolve, _) => setImmediate(JSON.stringify())
)

const parseObjectArgs = new stream.Transform({
        objectMode: true,
        transform: (item, _, callback) => {
            callback(null, {
                ...item,
                args: [...item.data.args]
            })
        }
    }, 
)

module.exports = parseObjectArgs;