const stream = require('stream');

const reduceArgs = new stream.Transform({
        objectMode: true,
        transform: (item, _, callback) => {
            item.args.then((values) => {
                values.reduce((previousValue = '', currentValue) => )
            })            
        }
    }, 
)

module.exports = reduceArgs;