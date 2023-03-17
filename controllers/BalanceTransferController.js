const User = require('../models/User');
const BalanceTransfer = require('../models/BalanceTransfer');

exports.balanceTransferPostController = async (req, res, next) =>{
    try {
        const toUser = await User.find({username: req.body.to});
        if (!toUser.length) return res.json({
            message: 'User Not Found',
            error: true
        });
        const newTransfer = new BalanceTransfer({...req.body , from:req.user, to: toUser[0]._id});
        const fromUser = await User.findById(req.user);
        await newTransfer.save();
        await User.findByIdAndUpdate(toUser[0]._id,{balance: toUser[0].balance + req.body.amount});
        await User.findByIdAndUpdate(req.user,{balance: fromUser.balance - req.body.amount});
        res.json({
            message: 'Balance successfully send!',
            error: false
        });
    } catch (error) {
        next(error)
    }
};

exports.balanceTransferGetController = async (req, res, next) =>{
    try {
        const { user } = req.query;
        const page = req.body.page || 0;
        if (user==='user') {
            const length = await BalanceTransfer.find({from: req.user}).count({})
            const transfer = await BalanceTransfer.find({from: req.user})
            .populate('to', 'username name')
            .skip( 5 * Number(page))
            .sort('-createdAt')
            .select({
                __v:0,
                updatedAt:0
            });
            res.json({transfer, length})
        }
        else if(user === 'admin'){
            const length = await BalanceTransfer.find({}).count({})
            const transfer = await BalanceTransfer.find({})
            .populate('to', 'username')
            .populate('from', 'username')
            .skip( 5 * Number(page))
            .sort('-createdAt')
            .select({
                __v:0,
                updatedAt:0
            });
            res.json({transfer, length})
        }
    } catch (error) {
        next(error)
    }
};
