const User = require('../models/User');
const UserBet = require('../models/UserBet');
const Result = require('../models/Result');
const Rate = require('../models/Rate');
const Club = require('../models/Club');
const isNumber = require('../utils/isNumber')

exports.betPostController = async (req, res, next) =>{
    try {
        const user = await User.findById(req.user);
        if (!(user.balance >= req.body.amount)) return res.json({
            message: 'There is not enough balance',
            error: true
        });
        await Result.findByIdAndUpdate(req.body.result,{
            $push:{'user': user._id}
        }, {new: true});

        const bet = new UserBet({...req.body, user: user._id, win: false})
        await bet.save();
        
        await User.findByIdAndUpdate(user._id,{
            balance: isNumber(user.balance - Number(req.body.amount))
        });

        const rate = await Rate.findById('6138b5e469f2164564901407');
        // club rate
        let clubBalance = req.body.amount * rate.club ;
        const club = await Club.findById(user.club)
        const clubHolder = await User.find({username:club.clubHolder})

        await User.findByIdAndUpdate(clubHolder[0]._id,{
            balance: clubHolder[0].balance + isNumber(clubBalance)
        });
        await Club.findByIdAndUpdate(user.club,{balance: club.balance + isNumber(clubBalance) })
       
        res.json({
            message: 'Bet send successfully!', error: false
        })
    } catch (error) {
        error.status = 500
        next(error)
    }
};

exports.betGetController = async (req, res, next) =>{ 
    const page = req.query.page || 0;
    try {
        const betsLength = await UserBet.find({})
        const bet = await UserBet.find({})
        .populate('user', 'username')
        .populate('game', 'name country1 country2')
        .populate('bet', 'title')
        .populate('result', 'question rate status')
        .sort('-createdAt')
        .skip(5* Number(page)).limit(5)
        res.json({bet, length: betsLength.length});
    } catch (error) {
        next(error)   
    }
}
exports.userBetStatusUpdateController = async (req, res, next) =>{
    const {resultId, status} = req.query
    try {
        const result = await Result.findById(resultId).populate('user', 'balance');
        if (result.status === 'Win' || result.status === 'Loss')res.json({
            message: 'Bet al ready wined',
            error: true
        });
        const users = [...result.user]
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            const userBets = await UserBet.find({user: user._id, result: result._id});
            let userBalance = user.balance;
            for (let j = 0; j < userBets.length; j++) {
                userBalance += isNumber(Number(userBets[j].amount) * Number(userBets[j].rate)) 
            };
            if (status === 'Win') {
                await User.findByIdAndUpdate(user._id,{
                    balance: userBalance
                })
            }
        };
        await Result.findByIdAndUpdate(result._id,{status});

        res.json({
            message: 'Bet Wined successfully!',
            error: false
        })
    } catch (error) {
        next(error)   
    }
}

exports.userBetGetController = async (req, res, next) =>{
    try {
        const page = req.query.page || 0 ;
        
        const userBetLength = await UserBet.find({user:req.user});
        const userBets = await UserBet.find({user:req.user})
            .populate('game', 'name country1 country2')
            .populate('bet', 'title')
            .populate('result', 'question rate status')
            .skip( 5 * Number(page)).limit(5)
            .sort('-createdAt')
            .select({
                __v:0,
                updatedAt:0
            });
        res.json({bet:userBets, length: userBetLength.length})
    } catch (error) {
        next(error)   
    }
}

exports.userClubBetGetController = async (req, res, next) =>{
    const page = req.query.page || 0;
    try {
        let newBet = []
        const betsLength = await UserBet.find({})
        const bet = await UserBet.find({club:req.query.club})
        .populate({
            path:'user',
            select:'username',
            populate:{
                path:'club',
                select:'clubId'
            }
        })
        .populate('game', 'name country1 country2')
        .populate('bet', 'title')
        .populate('result', 'question rate status')
        .sort('-createdAt')
        .skip(5* Number(page)).limit(5)
        // console.log(req.query.club)
        // for (let i = 0; i < bet.length; i++) {
        //     const obj = bet[i];
        //     console.log(obj['user'].club.clubId)
        //         if (obj['user'].club.clubId ===req.query.club) {
        //             newBet = [...newBet, obj]
        //         }
        // }
        // const result = newBet.splice(5 * Number(page),5)
        res.json({result: bet, length: betsLength.length});
    } catch (error) {
        next(error)   
    }
}
