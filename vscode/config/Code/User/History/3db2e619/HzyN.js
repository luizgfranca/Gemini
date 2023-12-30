const queryPersonById = require("./find-person-by-id-pipeline/query-database")

async function findPersonById(req, res, id) {
    queryPersonById(id, () => {
        
    })
}

module.exports = findPersonById