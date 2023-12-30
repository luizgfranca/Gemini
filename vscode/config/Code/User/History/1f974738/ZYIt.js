const http = require('http')
const HttpMethod = require('./http/method')
const ContentService = require('./service/content/content.service')
const LoggerService = require('./service/logger/logger.service')
const { applicationProperties } = require('./properties');
const { url } = require('inspector');

const server = http.createServer(async (req, res) => {
    LoggerService.log(req.method, req,url);

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

server.listen(applicationProperties.PORT, () => {
    LoggerService.info(`Listening to ${applicationProperties.HOST}:${applicationProperties.PORT}`)
})