"use strict"
const notFound = require('./not-found');
const countPersons = require('./service/count-persons');
const createPerson = require('./service/create-person');
const findPersonById = require('./service/find-person-by-id');
const findPersons = require('./service/find-persons');

async function router(req, res) {
    const url = new URL(req.url, `http://${req.headers.host}`);

    switch(req.method) {
        case 'GET':
            const pathParts = url.pathname.split('/');
            console.log(pathParts)
            if(pathParts[1] === 'pessoas')  {
                return pathParts.length > 2 
                    ? findPersonById(req, res, pathParts[1]) 
                    : findPersons(req, res, url)
            } else return notFound(res)
        case 'POST':
            switch(url.pathname) {
                case '/pessoas': return createPerson(req, res);
                default: return notFound(res);
            }
        default: return notFound(res);
    }
}

module.exports = router;