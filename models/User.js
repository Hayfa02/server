const mongose =require('mongoose')
const UserSchema=mongose.Schema({
    firstname:{
        type: String,
        required: true
    },
    lastname:String,
    email:{
        type: String,
        required: true,
        unique: true
    },
    phone:String,
    age:String,
    password:{
        type: String,
        required: true
    },
    passwordChangeDate:{
        type: Date,
        default:Date.now()
    },
    role:{
        type:String,
        enum: [ "PLAYER", "OWNER"],
        default:"PLAYER"
    },
    DeconnectionTime: {
        type: Date,
        default: Date.now()-60,
    },
    accountStatus: {
        type: Boolean,
        default: true
    },
    images: [
        {
            url: String,
            uploaded: { type: Date, default: Date.now() },
        }
    ],
    avatars: [
        {
            url: Buffer,
            contentType: String,
            uploaded: { type: Date, default: Date.now() },
        }
    ],
    confirmed: {
        type: Boolean,
        default: false
    },
    phone:{
        number:String,
        verified:{
            type:Boolean,
            default:false
        },
        verificationCode:Number,
        verificationCodeExpireDate:{
            type:Date,
            default:Date.now()
        }
    }
})
module.exports =mongose.model('Users',UserSchema)