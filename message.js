function formatMessage(username, text){
    return {
        username: username,
        text: text,
        time: new Date().toISOString()
    }
} 

module.exports = {
    formatMessage: formatMessage
}
