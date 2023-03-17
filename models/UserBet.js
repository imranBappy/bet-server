const {Schema, model} = require('mongoose');
const userBetSchema = new Schema({
    amount:{
        type: Number,
        required: true
    },
    rate:{
        type: Number,
        required: true
    },
    win:{
        type: Boolean,
        required: true
    },
    game:{
        type: Schema.Types.ObjectId,
        ref:'game',
        required: true
    },
    club:{
        type: Schema.Types.ObjectId,
        ref:'bet',
        required: true
    },
    bet:{
        type: Schema.Types.ObjectId,
        ref:'bet',
        required: true
    },
    result:{
        type: Schema.Types.ObjectId,
        ref:'result',
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref:'user',
        required: true
    }
},{timestamps: true})

const UserBet = model('userBet', userBetSchema);
module.exports = UserBet;

