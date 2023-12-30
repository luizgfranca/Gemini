"use strict"
const countPersons = require('./service/count-persons');
const createPerson = require('./service/create-person');
const findPersonById = require('./service/find-person-by-id');
const findPersons = require('./service/find-persons');

async function notFound(res) {
    res.statusCode = 404;
    return res.end();
} 

async function router(req, res) {
    const url = new URL(req.url, `http://${req.headers.host}`);

    switch(req.method) {
        case 'GET':
            const pathParts = url.pathname.split('/');
            if(pathParts[0] === 'pessoas' && pathParts.length > 1) {
                
            }
        case 'POST':
            switch(url.pathname) {
                case '/pessoas': return createPerson(req, res);
                default: return notFound(res);
            }
        default: return notFound(res);
    }
}

module.exports = router;