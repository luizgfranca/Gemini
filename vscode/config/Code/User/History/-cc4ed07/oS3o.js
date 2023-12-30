const { Transform } = require("stream");
const databaseProvider = require("../../provider/database-pool");

const findByIdQuery = (id) => `select * from pessoas where id = ${id}`;

const queryDatabase = new Transform({
    objectMode: true,
    transform({res, id}, _, callback) {
        databaseProvider.connectionPool.connect((err, client, done) => {
            if (err) throw err
            const query = new QueryStream(findByIdQuery(id), [50])
            const stream = client.query(query)
            //release the client when the stream is finished
            stream.on('end', done)
            stream.pipe(JSONStream.stringify()).pipe(process.stdout)
        })
    }
})