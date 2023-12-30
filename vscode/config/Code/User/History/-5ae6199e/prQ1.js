const onNotification = require("../provider/notification")

function start() {

    onNotification(() => {
        
    })

}


const StackSearchIndexUpdaterJob = { start }
module.exports = StackSearchIndexUpdaterJob