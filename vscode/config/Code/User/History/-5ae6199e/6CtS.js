const onNotification = require("../provider/notification")

function insertStackIndexStatement(id) {
    
}

function start() {

    onNotification('pessoa__created', (id) => {
        
    })

}


const StackSearchIndexUpdaterJob = { start }
module.exports = StackSearchIndexUpdaterJob