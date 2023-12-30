"use strict"
const countPersons = require('./service/count-persons');

async function router(req, res) {
    const url = new URL(req.url, `http://${req.headers.host}`);

    switch(req.method) {
        case 'GET':
            switch(url.pathname) {
                case '/contagem-pessoas': return countPersons(req, res);
                default: 
                    res.statusCode = 404;
                    return res.end();
            }
    }
}

module.exports = router;