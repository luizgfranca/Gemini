const stream = require('stream');

const toString = async (obj) => {}

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