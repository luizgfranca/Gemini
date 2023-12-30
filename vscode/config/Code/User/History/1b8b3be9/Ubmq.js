const stream = require('stream');

const divide = new stream.Transform({
        objectMode: true,
        transform: (item, _, callback) => {
            callback(null, {
                ...item,
                args: [...item.data.args]
            })
        }
    }, 
)

module.exports = divide;