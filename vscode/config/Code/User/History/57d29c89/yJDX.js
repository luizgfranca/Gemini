const stream = require('stream');

const toString = new Promise((resolve, _) => {
    
})

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