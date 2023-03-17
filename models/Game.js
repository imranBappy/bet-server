const {Schema, model} = require('mongoose');

const gameSchema = new Schema({
    name:{
        type: String,
        trim: true,
        required: true
    },
    country1:{
        type: String,
        trim: true,
        required: true
    },
    country2:{
        type: String,
        trim: true,
        required: true
    },
    date:{
        type: String,
        trim: true,
        required: true
    },
    type:{
        type: String,
        trim: true,
        required: true
    },
    isActive:{
        type: Boolean,
        default: false
    },
    status:{
        type: String,
        trim: true,
        required: true
    },
    bets:[
        {
            type: Schema.Types.ObjectId,
            ref: 'bet'
        }
    ]
},{timestamps: true});

const Game = model('game', gameSchema);
module.exports = Game;
