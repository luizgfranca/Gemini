const EventEmitter = require('events');
const { ContentResolverService } = require('../service/content/content-resolver.service');

const contentEvents = new EventEmitter()
const contentResolverService = new ContentResolverService()

contentEvents.setMaxListeners(0);

contentEvents.on('content::request', (path) => {
    contentResolverService.resolve(
        path, 
        (fileStream) => contentEvents.emit(`content::ready::${path}`, fileStream)
    )
})

function postRequest({path, callback}) {
    contentEvents.emit('content::request', path);
    contentEvents.once(
        `content::ready::${path}`, 
        (fileStream) => callback(fileStream)
    );
}

module.exports = { postRequest }; 