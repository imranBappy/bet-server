const {Schema, model} = require('mongoose')

const newsSchema = new Schema({
    news:{
        type: String,
        trim: true
    }
}, { timestamps: true } )

const News = model('news', newsSchema)
module.exports = News