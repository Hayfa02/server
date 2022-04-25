const mongose = require('mongoose')
const ReservationSchema = mongose.Schema({
    statiumId: {
        type: String,
        required: true
    },
    playerId: {
        type: String,
        required: true,
    },
    reservationDate: {
        type: Date,
    },
    accepted: {
        type: Boolean,
        default: false
    },
    paid: {
        type: Boolean,
        default: false
    },
    team:{
        number:Number,
        team:Array,
        maxTeam: {
            type: Number,
            default: 7
        },
        missedPlayerNumber: {
            type: Number,
            default: 0
        },
    }
})
module.exports = mongose.model('Reservation', ReservationSchema)