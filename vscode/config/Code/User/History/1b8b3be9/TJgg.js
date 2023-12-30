const stream = require('stream');

const divide = new stream.Transform({
        objectMode: true,
        transform: (item, _, callback) => {
            console.log(typeof args)
            callback(null, {
                ...item,
                args: [item.data.args]
                // args: typeof args === 'string' 
                //     ? [item.data.args] 
                //     : [...item.data.args]
            })
        }
    }, 
)

module.exports = divide;