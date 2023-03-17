const Admin = require("../models/Admin")
const User = require("../models/User")

exports.dashboardGetController = async (req, res, next) =>{
    try {
        const user = await User.find({}).length
        const admin = await admin.find({}).length
        res.json({
            data: [{
                user,
                admin
            }]
        })
    } catch (error) {
        next(error)
    }
}