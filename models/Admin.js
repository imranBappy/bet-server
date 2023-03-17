const {Schema, model} = require('mongoose')

const adminSchema = new Schema({
    name:{
        type: String,
        trim: true,
        required: true,
    },
    email:{
        type: String,
        trim: true,
        required: true,
        minlength:10,
        maxlength:50,
    },
    isAdmin:{
        type: Boolean,
        required: true,
    },
    password:{
        type: String,
        trim: true,
        minlength: 10,
        required: true,
    },
    createdBy:{
        type: Schema.Types.ObjectId,
        ref:'admin'
    }
}, { timestamps: true } )

const Admin = model('admin', adminSchema)
module.exports = Admin