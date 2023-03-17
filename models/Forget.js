const {Schema, model} = require('mongoose')

const forgetSchema = new Schema({
    email:{
        type: String,
        trim: true,
        required: true,
    },
    otp:{
        type: String,
        required: true,
    },
    token:{
        type: String,
        required: true,
    }
}, { timestamps: true } )

const Forger = model('forget', forgetSchema)
module.exports = Forger