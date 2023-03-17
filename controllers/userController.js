const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Club = require('../models/Club');
const Forget = require('../models/Forget');
const emailSender = require('../utils/emailSender')

exports.registerPostController = async (req, res, next) =>{
    try {
        const hash = await bcrypt.hash(req.body.password, 10)
        req.body.password = hash;

        const username = await User.find({username: req.body.username})
        if (username.length !== 0 ) {
            return res.json({
                message:'Username all ready exist!',
                error: true,
                data:[]
            })
        };
        const email = await User.find({email: req.body.email})
        if (email.length !== 0 ) {
            return res.json({
                message:'Email already exist!',
                error: true,
                data:[]
            })
        };
        const phone = await User.find({phone: req.body.phone})
        if (phone.length !== 0 ) {
            return res.json({
                message:'Phone number already exist!',
                error: true,
                data:[]
            })
        };

        const sName = await User.find({username: req.body.sName.trim()})
            if (sName.length === 0 ) {
                req.body.sName = '60ea8db5fcabd2314dca0777'
            }else{
                req.body.sName = sName[0]._id;
            }
            const user = new User({...req.body, active: true});
            const newUser = await user.save();
            await Club.findByIdAndUpdate(req.body.club,{
                    $push:{'user': newUser._id}
            })
            res.json({
                message:'User register successfully!',
                error: false,
                data:[]
            })
            emailSender(req.body.email,`Thanks ${req.body.name} for create account`)
    } catch (error) {
        next(error)
    }
}

exports.loginPostController = async (req, res, next)=>{
    const {username, password} = req.body
    try {
        const result = await User.find({username})
        .populate('club', 'name clubId')
        .populate('sName', 'name username')
        .select({
            __v:0,
            createdAt:0,
            updatedAt:0
        })
        const user = result[0];
        if (!result.length) return res.json({message:'User not found!', error: true})
        const matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword) return res.json({message:'Password is wrang', error: true});
        if (!user.active) return res.json({message:'You account is disabled !', error: true})
        const token = jwt.sign({_id:user._id}, process.env.SECRET,{expiresIn: '24h'})
        res.json({
            message:'User Login Successful! ',
            token: token,
            error:false,
            user: result
        })
    } catch (error) {
        next(error)
    }
}

exports.changePasswordPutController = async (req, res, next) =>{
    try {
        const user = await User.findById(req.user)
        const result = await bcrypt.compare( req.body.pass ,user.password)
        if (result) {
            if (req.body.newPass.length < 5) {
                return res.json({
                    message: 'Please input valid password',
                    error: true
                })
            }
        }
        const hash = await bcrypt.hash(req.body.newPass, 10)
        await User.findOneAndUpdate({_id: req.user},{$set:{password: hash}})
        res.json({
            message: 'Password Changed Successfully!'
        })
    } catch (error) {
        next('There was a server side error')
    }
}

exports.singleUserGetController = async (req, res, next) =>{
    const {userId} = req.params
    try {
        const user = await User.findById(userId)
        .populate('club', 'name clubId')
        .populate('sName', 'name username')
        .select({
            password: 0,
            __v:0,
            createdAt:0,
            updatedAt:0
        });

        res.json({
            data:[user]
        })
    } catch (error) {
        next(error)
    }
}



exports.allUserGetController = async (req, res, next) =>{
    const page = req.query.page || 0
    try {
        const arr =  await User.find({})
        const user = await User.find({})
            .populate('sName', 'username')
            .populate('club', 'clubId')
            .skip(5* Number(page)).limit(5)
            .select({
                password: 0,
                __v:0,
                createdAt:0,
                updatedAt:0
            })

        res.json({
            users: user,
            length: arr.length
        })
    } catch (error) {
        next(error)
    }
}
exports.userUpdateController = async (req, res, next) =>{
    try {
        const updateUser = await User.findByIdAndUpdate(req.body._id,{
            club: req.body.club,
            balance: req.body.balance,
            active: req.body.active
        },{new: true})
        .populate('sName', 'username')
        .populate('club', 'clubId')
        .select({createdAt:0, updatedAt:0, password: 0, __v:0});
        res.json({
            message: `${updateUser.name} ${updateUser.active? 'Active': 'Inactive'} Successfully!`,
            error: false,
            user: updateUser
        });
    } catch (error) {
        next(error)
    }
}

exports.forgetUserPostController = async (req, res, next) =>{
    try{

        const forget = await Forget.find({email: req.body.email})
        const user = await User.find({email: req.body.email})
        if(!user.length) return res.json({
            message: 'User Not Found!',
            error: true
        })
        for(let i = 0; i < forget.length; i++){
            await Forget.findByIdAndDelete(forget[i]._id)
        }
        const token = jwt.sign({email:req.body.email}, process.env.SECRET,{expiresIn: '0.1h'});
        const otp = Math.floor(Math.random() * 1000000)
        const newForget = new Forget({email:req.body.email, token, otp})
        await newForget.save()
        console.log(emailSender(req.body.email,`Your OTP:  ${otp}`))
        res.json({
            message: 'Successfully! Send OTP',
            error: false
        })
    } catch (error) {
        next(error)
    }
}

exports.forgetCheckPostController = async (req, res, next) =>{
    try{
        const forget = await Forget.findOne({otp: req.body.otp})
        const otp = Math.floor(Math.random() * 100000000)
        await jwt.verify(forget.token, process.env.SECRET );
        const hash = await bcrypt.hash(otp.toString(), 10)
        const result = await User.findOneAndUpdate({email: forget.email},{$set:{password: hash}})
        await Forget.findByIdAndDelete(forget._id)
        emailSender(forget.email,`Your Password:  ${otp}`)
        res.json({
            message: 'Successfully! Send Password you email',
            error: false
        })
    } catch (error) {
        error.status = 700
        next(error)
    }
}