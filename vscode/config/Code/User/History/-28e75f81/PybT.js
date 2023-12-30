import http from 'http'
import morgan from 'morgan'
import bodyParser from 'body-parser'

function createHugeList(listSize) {
    let hugeList = new Array(listSize)
    for(let i = 0; i < listSize; i ++) {
        hugeList[i] = i === 0 ? 1 : hugeList[i - 1] * 5
    }

    return hugeList[hugeList.length - 1]
}

function setupNode(app, portToListen) {
    app.server = http.createServer(app)
    app.use(morgan('dev'))
    app.use(bodyParser.json())

    app.post('/echo', (req, res) => {
        console.log(req.body)
        process.send(`handled echo request ${JSON.stringify(req.body)}`)
        res.json(req.body)
    })

    app.get('/break', (req, res) => {
        const finalValue = createHugeList(1e6)
        res.json({ finalValue })
    })

    app.listen(portToListen, () => process.send(`listening to port ${portToListen}`))
}


export { setupNode }