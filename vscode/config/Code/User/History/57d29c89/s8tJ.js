const stream = require('stream');

const toString = (object) => new Promise(
    (resolve, _) => setImmediate( resolve(JSON.stringify(object, null, 2)) )
)

const parse = async (item) => typeof item === 'object' ? toString(item) : item

const parseObjectArgs = new stream.Transform({
        objectMode: true,
        transform: (item, _, callback) => {
            Promise.all(item.args)
        }
    }, 
)

module.exports = parseObjectArgs;