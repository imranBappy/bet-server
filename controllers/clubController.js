const Club = require("../models/Club")
const User = require("../models/User")

exports.clubPortController = async (req, res, next) =>{
    try {
         
        const checkClub = await Club.find({clubId: req.body.clubId})
        
        if (checkClub.length) {
            return res.json({
                message: 'Club Id Invalid',
                error: true
            })
        }
        
        const checkUser = await User.find({username: req.body.clubHolder})
        if (!checkUser.length) {
            return res.json({
                message: 'Username Invalid',
                error: true
            })
        }

       
      if(checkUser[0].isClubHolder){
        return res.json({
            message: 'Already He is a club holder',
            error: true
        })
      }

        await Club.findOneAndUpdate({_id:checkUser[0].club}, 
            { $pull: { 'user': checkUser[0]._id  } })

        const newClub =  new Club({...req.body, balance:0});
        const createdClub = await newClub.save();

        await User.findOneAndUpdate({username: req.body.clubHolder},{$set:{
            isClubHolder: true,
            club:createdClub._id
        }})
        await Club.findOneAndUpdate({_id:createdClub._id}, 
            { $push: { 'user': checkUser[0]._id  } })

        res.json({
            message: 'Club Created Successfully',
            error: false
        })  
    } catch (error) {
        next(error)
    }
}
exports.clubGetController = async (req, res, next) =>{
    const page = req.query.page || 0;
    try {
        const clubLength = await Club.find({});
        const club = await Club.find({}).skip(5* Number(page)).limit(5).select({
                __v:0,
                createdAt:0,
            })
        res.json({
            club,
            length: clubLength.length
        })
    } catch (error) {
        next(error)
    }
}
exports.rankingClubGetController = async (req, res, next) =>{
    try {
        const club = await Club.find({})
        .select({
            __v:0,
            createdAt:0,
            updatedAt:0,
            clubHolder:0,
            user: 0,
        })
        club.sort(function(a, b){return b.balance - a.balance});
        res.json({
            club
        })
    } catch (error) {
        next(error)
    }
}
exports.clubUpdatePutController = async (req, res, next) =>{
    try {
        const user = await User.findById(req.user)

        await Club.findOneAndUpdate({_id:user.club}, 
            { $pull: { 'user': user._id  } })

        await User.findByIdAndUpdate(req.user,{$set:{
            club:req.query.club
        }})
        await Club.findOneAndUpdate({_id:req.query.club}, 
            { $push: { 'user': user._id  } })

        res.json({
            message:"Updated Successfully",
            error:false,
        })
    } catch (error) {
        next(error)
    }
}

exports.singleClub = async (req, res, next) =>{
    try {
        const club = await Club.findOne({clubHolder: req.params.id})
        .select({
            __v:0,
            createdAt:0,
            updatedAt:0,
            clubHolder:0,
        })
       
        res.json({
            club
        })
    } catch (error) {
        next(error)
    }
}