const News = require("../models/News");
const Number = require("../models/Number");
const Rate = require("../models/Rate");


exports.newPostController = async (req, res, next) =>{
    try {
        await News.findOneAndUpdate({_id:'61373dbe00f00318e08ffbed'},{$set:{news:req.body.news}});
        res.json({
            message:'Add successful'
        })
    } catch (error) {
        next(error)
    }
}
exports.newGetController = async (req, res, next) =>{
    try {
        const addNews = await News.find({})
        res.json({
            data:addNews[0]
        })
        
    } catch (error) {
        next(error)
    }
}

exports.numberPostController = async (req, res, next) =>{
    try {
        const newNumber = new Number(req.body)
        await newNumber.save()
        res.json({
            message:'Add successful'
        })
    } catch (error) {
        next(error)
    }
}
exports.numberGetController = async (req, res, next) =>{
    try {
        const number = await Number.find({}).select({
            createdAt:0,
            updatedAt:0,
            __v:0
        })
        res.json({
            data:number
        })
    } catch (error) {
        next(error)
    }
}

exports.numberDeleteController = async (req, res, next) =>{
    try {
        await Number.findByIdAndDelete(req.query.id)
        res.json({
            message:'Delete successful'
        })
    } catch (error) {
        next(error)
    }
}

exports.sponsorPostController = async (req, res, next) =>{
    try {
        const newSponsor = new Rate(req.body)
        await newSponsor.save()
        res.json({
            message:'Successful Updated'
        })
    } catch (error) {
        next(error)
    }
}
exports.rateUpdateController = async (req, res, next) =>{
    try {
        if (req.query.rate === 'club' ) {
        console.log(req.body);

        await Rate.findOneAndUpdate({_id:'6138b5e469f2164564901407'},{$set:{
            club:req.body.club
        }})

        }else if (req.query.rate === 'sponsor'){
        console.log(req.body);

            await Rate.findOneAndUpdate({_id:'6138b5e469f2164564901407'},{$set:{
                sponsor:req.body.sponsor
            }})
        }
      
        res.json({
            message:'Successful Updated'
        })
    } catch (error) {
        next(error)
    }
}

exports.rateGetController = async (req, res, next) =>{
    try {
        if (req.query.rate === 'club' ) {
            const clubRate = await Rate.find({});
            res.json({
                data:clubRate[0].club
            })
        }else if (req.query.rate === 'sponsor'){
            const clubRate = await Rate.find({});
            res.json({
                data:clubRate[0].sponsor
            })
        }
       
    } catch (error) {
        next(error)
    }
}