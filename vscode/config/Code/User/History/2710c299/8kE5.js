const countPersons = require('./service/count-persons');

async function router(req, res) {
    const url = new URL(req.url);

    switch(req.method) {
        case 'GET': {
            switch(url.pathname) {
                case '/contagem-pessoas': countPersons();
            }
        }
    }
}

module.exports = router;