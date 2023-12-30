const { AccumulateStream } = require('accumulate-stream');

const accumulator = () =>  new AccumulateStream({size: '1kb'})