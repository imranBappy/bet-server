const Bet = require("../models/Bet")
const Result = require("../models/Result")
const Game = require("../models/Game")

exports.betTitlePostController = async (req, res, next) =>{
    try {
        const bet = new Bet({...req.body, show: true})
        const newBet = await bet.save()
        await Game.findByIdAndUpdate(req.body.game,{
            $push:{'bets': newBet._id}
        })
        res.json({_id:newBet._id})
    } catch (error) {
        next(error)
    }
}

exports.resultAddPostController = async (req, res, next) =>{
    try {
        const newResult = new Result({...req.body, show: true, status: 'Pending'})
        const data = await newResult.save();
        await Bet.findOneAndUpdate(
            {_id: req.body.bet}, 
            { $push:{ 'question' : data._id} } 
        )
        
        res.json({
            message:'Successfully question created !',
            error: false
        })
    } catch (error) {
        next(error)
    } 
}

exports.allBetGetController = async (req, res, next) =>{
    try {
        const {gameId} = req.query;
        const allBet = await Bet.find({game: gameId}).populate('question', 'question rate show status user')
        res.json({
            data: allBet
        })
    } catch (error) {
        next(error)
    }
}
exports.titleAllDeleteController = async (req, res, next) =>{
    try {
        await Bet.deleteMany({})
        res.json({
            message:'Bet deleted successfully!'
        })
    } catch (error) {
        next(error)
    }
}
exports.betAllDeleteController = async (req, res, next) =>{
    try {
        await Result.deleteMany({})
        res.json({
            message:'Result deleted successfully!'
        })
    } catch (error) {
        next(error)
    }
}
exports.singleBetGetController = async (req, res, next) =>{
    try {
        const { betId } = req.query;
        const bet = await Result.findById(betId).select({
            __v:0
        })
        res.json({
            bet
        })
    } catch (error) {
        next(error)
    }
}
exports.resultUpdateController = async (req, res, next) =>{
    try {
        const updatedResult = await Result.findByIdAndUpdate(req.body._id,{
            question: req.body.question,
            rate: req.body.rate,
            show: req.body.show
        },{new: true})
        res.json({
            message: 'Question updated successfully',
            error: false,
            result:updatedResult
        })
    } catch (error) {
        console.log(error);
        next(error)
    }
}
exports.betSingleGetController = async (req, res, next) => {
    try {
        const {betId} = req.query;
        const bet = await Bet.findById(betId).select({
            __v: 0,
            updatedAt:0,
            createdAt: 0,
            question:0
        })
        res.json({
            bet
        })
    } catch (error) {
        next(error);
    }
}
exports.betUpdateController = async (req, res, next) => {
    try {
        const bet = await Bet.findByIdAndUpdate(req.body._id,{
            title: req.body.title,
            show: req.body.show
        },{new: true})
        .populate('question', 'question rate show')
        .select({
            __v: 0,
            updatedAt:0,
            createdAt: 0,
        })
        res.json({
            message: 'Bet updated successfully',
            error: false,
            bet
        })
    } catch (error) {
        next(error);
    }
}
