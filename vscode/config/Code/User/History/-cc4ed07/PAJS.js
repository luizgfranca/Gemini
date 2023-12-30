const { Transform } = require("stream");
const databaseProvider = require("../../provider/database-pool");

const findByIdQuery = (id) => `select * from pessoas where id = ${id}`;

async function queryPersonById(id) {
    return (await databaseProvider.connectionPool.connect())
        .query(new QueryStream(findByIdQuery(id), [50]));

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