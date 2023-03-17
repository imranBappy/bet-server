const Transaction = require("../models/Transaction");
const User = require("../models/User");
exports.transactionPortController = async (req, res, next) =>{
    try {
        const transaction = new Transaction({...req.body, status:'Pending'});
        const user = await User.findById(req.body.user)
        
        if (req.body.transaction === 'withdraw') {
            if(user.balance >=Number(req.body.amount) ) {
                await User.findByIdAndUpdate(user._id, {
                    balance: user.balance  - Number(req.body.amount)
                });
                await transaction.save()
            }else{
                return res.json({message: `There is not enough balance`, error: true})
            }
        }else{
            await transaction.save()
        }

        res.json({message: `${req.body.transaction} Request successfully`})
    } catch (error) {
        next(error)
    }
};

exports.transactionGetController =  async (req, res, next) =>{
   
    try {
        const {transaction, page, user} = req.query;
        const pageNumber =  page || 0 ;
        console.log(pageNumber);
        let createTransaction = {}
        if (user) {
            createTransaction = {user};
        }else if(transaction){
            createTransaction = {transaction};
        }
        const length = await Transaction.find(createTransaction).count({})
        const Transactions = await Transaction.find({}).populate('user', 'username balance')
        .sort('-createdAt')
        .skip(5 * Number(pageNumber)).limit(5)
        .select({
            __v:0,
            updatedAt:0
        });
        res.json({
            transaction: Transactions,
            length: length
        })
    } catch (error) {
        console.log(error);
        next(error)
    }
}

exports.transactionUpdateController = async (req, res, next) =>{
    try {
    const { trxId } = req.params;
    const { status ,userId } = req.query;
        const transaction = await Transaction.findById(trxId)
        const updateTransaction = await Transaction.findByIdAndUpdate(trxId, {
            status: status
        },{new: true})
        .populate('user', 'username balance')
        .select({__v:0, updatedAt:0, });
        if (transaction.transaction === 'withdraw')return res.json({
            message: `Transaction successfully ${updateTransaction.status}`,
            error: false,
            transaction: updateTransaction
        });
        const user =  await User.findById(userId)
        let updateBalance = 0;
        if (status === 'Accepted') {
            updateBalance = Number(user.balance) + updateTransaction.amount
        }else if(status === 'Rejected'){
            updateBalance = Number(user.balance)
        }
        await User.findByIdAndUpdate(userId, {
            balance: updateBalance
        });
        res.json({
            message: `Transaction successfully ${updateTransaction.status}`,
            error: false,
            transaction: updateTransaction
        });
    } catch (error) {
        next(error)
    }
}