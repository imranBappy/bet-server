const {Schema, model} = require('mongoose')

const rateSchema = new Schema({
    club:Number,
    sponsor:Number
}, { timestamps: true } )

const Rate = model('rate', rateSchema)
module.exports = Rate;