const onNotification = require("../provider/notification")



function insertStackIndexStatement(id) {
    return `
    INSERT INTO search_index_stack_pessoa (id_pessoa, stack_item)
	    select p.id, replace(stack.value::text, '"', '') as item
        from pessoa p
        cross join json_array_elements(p.stack) stack
        where p.id = '${id}'`
}

function start() {

    onNotification('pessoa__created', (id) => {
        
    })

}


const StackSearchIndexUpdaterJob = { start }
module.exports = StackSearchIndexUpdaterJob