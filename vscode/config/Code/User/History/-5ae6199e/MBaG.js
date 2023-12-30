const databaseProvider = require("../provider/database-pool")
const onNotification = require("../provider/notification")



function insertStackIndexStatement(id) {
    return `INSERT INTO search_index_stack_pessoa (id_pessoa, stack_item)
	    SELECT p.id, UPPER(REPLACE(stack.value::text, '"', '')) as item
        FROM pessoa p
        CROSS JOIN json_array_elements(p.stack) stack
        WHERE p.id = '${id}'`
}

function start() {

    onNotification('pessoa__created', (id) => {
        databaseProvider.connectionPool
            .query(insertStackIndexStatement(id))
            .then(() => console.log('updated stack search index for ' + id))
            .catch((error) => console.log('error updating stack search index for ' + id, error))
    })

}


const StackSearchIndexUpdaterJob = { start }
module.exports = StackSearchIndexUpdaterJob