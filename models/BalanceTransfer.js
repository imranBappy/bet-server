const {Schema, model} = require('mongoose');

const balanceTransfer = new Schema({
    amount:{
        type: Number,
        trim: true,
        required: true
    },
    from:{
        type: Schema.Types.ObjectId,
        ref:'user',
        required: true
    },
    to:{
        type: Schema.Types.ObjectId,
        ref:'user',
        required: true
    }
},{timestamps: true})

const BalanceTransfer = model('transfer', balanceTransfer);
module.exports = BalanceTransfer;
