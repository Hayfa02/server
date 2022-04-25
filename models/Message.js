const mongose = require('mongoose')
const MessageSchema = mongose.Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true,
    },
    text: {
        type: String,
    },
    vue: {
        type: Boolean,
        default: false
    },
    send: {
        type: Boolean,
        default: false
    },
    
})
module.exports = mongose.model('Message', MessageSchema)