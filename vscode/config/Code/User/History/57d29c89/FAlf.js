const stream = require('stream');

const toString = (object) => new Promise(
    (resolve, _) => setImmediate( resolve(JSON.stringify(object, null, 2)) )
)

const self = (item) => Promise.resolve(item);

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