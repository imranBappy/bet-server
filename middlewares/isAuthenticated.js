const jwt = require('jsonwebtoken');

const isAuthenticated = async (req, res, next) =>{
    try {
        const {authorization} = req.headers;
        if (!authorization) return res.json({
                message: 'User Unauthorized',
                error:true
            })
        const decode = await jwt.verify(authorization, process.env.SECRET );
        req.user = decode._id;
        next();
    } catch (error) {
        error.status = 401;
        next(error)
    }
};

module.exports = isAuthenticated;