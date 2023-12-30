async function router(req, res) {
    const url = new URL(req.url);

    switch(req.method) {
        case 'GET': {
            switch(url.pathname) {
                case '/contagem-pessoas'
            }
        }
    }
}

module.exports = router;