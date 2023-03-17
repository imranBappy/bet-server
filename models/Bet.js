const {Schema, model} = require('mongoose');

const betSchema = new Schema({
    title:{
        type: String,
        trim: true,
        required: true
    },
    show:{
        type: Boolean,
        required: true
    },
    question:[
        {
            type: Schema.Types.ObjectId,
            ref: 'result'
        }
    ],
    game:{
        type: Schema.Types.ObjectId,
        ref:'game',
        required: true
    }
},{timestamps: true})

const Bet = model('bet', betSchema);
module.exports = Bet;
