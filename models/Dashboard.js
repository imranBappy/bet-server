const {Schema, model} = require('mongoose')

const dashboardSchema = new Schema({
    deposit:Number,
    withdraw:Number,
    income:Number
}, { timestamps: true } )

const Dashboard = model('admin', dashboardSchema)
module.exports = Dashboard