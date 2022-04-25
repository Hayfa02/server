const mongose = require('mongoose')
const StadiumSchema = mongose.Schema({
    owner: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    adress: {
        city: {
            type: String,
            enum: ["Ariana", "Béja", "Ben Arous", "Bizerte", "Gabes", "Gafsa", "Jendouba",
                "Kairouan", "Kasserine", "Kebili", "Manouba", "Kef", "Mahdia", "Médenine", "Monastir",
                "Nabeul", "Sfax", "Sidi Bouzid", "Siliana", "Sousse", "Tataouine", "Tozeur", "Tunis", "Zaghouan"],
            required: true,
        },
        street: String
    },
    cordinates: {
        long: String,
        lat: String
    },
    images: [
        {
            url: String,
            uploaded: { type: Date, default: Date.now() },
        }
    ],
    verified: {
        type: Boolean,
        default: false
    },
    etat: {
        type: Boolean,
        default: false
    },
    rating: {
        rates: {
            type: Number,
            default: 3
        },
        number: {
            type: Number,
            default: 1
        },
    },
    field: {
        type: Number,
        default: 1
    },
    capacity: {
        type: Number,
        default: 1
    },
})
module.exports = mongose.model('Stadiums', StadiumSchema)