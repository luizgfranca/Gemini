"use strict"
const countPersons = require('./service/count-persons');
const createPerson = require('./service/create-person');
const findPersons = require('./service/find-persons');

async function notFound(res) {
    res.statusCode = 404;
    return res.end();
} 

async function router(req, res) {
    const url = new URL(req.url, `http://${req.headers.host}`);

    switch(req.method) {
        case 'GET':
            switch(url.pathname) {
                case '/pessoas': return findPersons(req, res);
                case '/contagem-pessoas': return countPersons(req, res);
                default: return notFound(res);
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