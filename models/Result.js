const {Schema, model} = require('mongoose');

const resultSchema = new Schema({
    question:{
        type: String,
        trim: true,
        required: true
    },
    rate:{
        type: Number,
        required: true
    },
    status:{
        type: String,
        required: true,
        enum:['Pending', 'Win', 'Loss']
    },
    show:{
        type: Boolean,
        required: true,
    },
    user:[
        {
            type: Schema.Types.ObjectId,
            ref:'user',
        }
    ],
    game:{
        type: Schema.Types.ObjectId,
        ref:'game',
        required: true
    },
    bet:{
        type: Schema.Types.ObjectId,
        ref:'bet',
        required: true
    }
},{timestamps: true});

const Result = model('result', resultSchema);
module.exports = Result;