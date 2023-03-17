const { Schema, model } = require('mongoose')

const clubSchema = new Schema({
    name:{
        type: String,
        trim: true,
        required: true,
        minlength:2,
        maxlength:25
    },
    user:[
        {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    ],
    balance:{
        type:Number,
        required: true,
    },
    clubId:{
        type: String,
        trim: true,
        required: true,
        minlength:5,
        maxlength:25
    },
    clubHolder:{
        type: String,
        ref:'user'
    },
},{timestamps: true} );

const Club = model('club', clubSchema);
module.exports= Club;
