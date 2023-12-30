const { Transform } = require("stream");
const databaseProvider = require("../../provider/database-pool");

const findByIdQuery = (id) => `select * from pessoas where id = ${id}`;

async function queryPersonById(id) {
    pool.connect((err, client, done) => {
        if (err) throw err
        const query = new QueryStream('SELECT * FROM generate_series(0, $1) num', [1000000])
        const stream = client.query(query)
        //release the client when the stream is finished
        stream.on('end', done)
        stream.pipe(JSONStream.stringify()).pipe(process.stdout)
    })
}

const queryDatabase = new Transform({
    objectMode: true,
    transform({res, id}, _, callback) {
        databaseProvider.connectionPool.connect((err, client, done) => {
            if (err) throw err
            const stream = client)
            //release the client when the stream is finished
            stream.on('end', done)
            stream.pipe(.stringify()).pipe(process.stdout)
        })
    }
})