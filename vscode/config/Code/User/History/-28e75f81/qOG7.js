import http from 'http'
import morgan from 'morgan'
import bodyParser from 'body-parser'

function setupNode(app, portToListen) {
    app.server = http.createServer(app)
    app.use(morgan('dev'))
    app.use(bodyParser.json())

    app.post('/echo', (req, res) => {
        console.log(req.body)
        process.send(`handled echo request ${JSON.stringify(req.body)}`)
        res.json(req.body)
    })

    app.listen(portToListen, () => process.send(`listening to port ${portToListen}`))
}


export { setupNode }