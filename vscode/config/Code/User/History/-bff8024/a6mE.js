const stream = require('stream');

const reduceArgs = new stream.Transform({
        objectMode: true,
        transform: (item, _, callback) => {
            item.args.then((values) => {
                callback(null, {
                    ...item,
                    message: values.reduce((previousValue = '', currentValue) => 
                        `${previousValue}${(currentValue ? `\n${currentValue}` : '')}`
                    )
                })
            })            
        }
    }, 
)

module.exports = reduceArgs;