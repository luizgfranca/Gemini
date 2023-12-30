const http = require('http')
const HttpMethod = require('./http/method')
const ContentService = require('./service/content/content.service')
const LoggerService = require('./service/logger/logger.service')

const host = 'localhost'
const port = 8080

const server = http.createServer(async (req, res) => {
    if(req.method === HttpMethod.GET) {
        const maybeFileStream = await ContentService.serveContent(req.url);

        if(!maybeFileStream) {
            res.statusCode = 404
            return res.end()
        }

        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html')
        return maybeFileStream.pipe(res)
        
    }

    res.statusCode = 404
    res.end()
})

server.listen(port, () => {
    console.log(`Listening to ${host}:${port}`)
})