const {Schema, model} = require('mongoose')

const numberSchema = new Schema({
    number:{
        type: String,
        trim: true
    },
    type:{
        type: String,
        trim: true
    },
    method:{
        type: String,
        trim: true
    }
}, { timestamps: true } )

const Number = model('number', numberSchema)
module.exports = Number