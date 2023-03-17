const express = require('express');
const mongoose = require('mongoose');
const setMiddleware = require('./middlewares/middlewares');
const setRoutes = require('./routes/routes');
require('dotenv').config();
const app = express();
const User = require('./models/User')
const Club = require('./models/Result')
const sendMail = require('./utils/emailSender')
// setMiddleware
// master branch
setMiddleware(app);
app.use((req,res,next)=>{
 console.log(`method = ${req.method}
link = ${req.headers.referer}
origin = ${req.headers.origin}/${req.url}
`);
    next()
})
// setRoute

// mongoose.set('useFindAndModify', false);
setRoutes(app);
app.get('/', (req, res) => {
    res.send('Hello world!')
})



app.use((req,res,next)=>{
    console.log(`method = ${req.method}
    link = ${req.headers.referer}
    origin = ${req.headers.origin}/${req.url}
    `);
    const error = new Error('404 Page Not Found!');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next)=>{
    switch (error.status) {
        case 700:
            return res.json({
                message: 'Please provide valid otp',
                error:true
            })
        case 404:
            return res.json({
                message: 'Page Not Found',
                error:true
            })
        case 401:
            return res.json({
                message: 'User Unauthorized',
                error:true
            })
        
        default:
            return res.json({
                message: 'Server side error',
                error:true
            });
    }
});



const port = process.env.PORT || 4000
// const mongoURI = `mongodb+srv://${process.env.BD_USER}:${process.env.DB_PASS}@cluster0.n9sfu.mongodb.net/bdGame?retryWrites=true&w=majority`
const mongoURl=`mongodb+srv://day20:sKia5oUhAVLZPjYL@cluster0.n9sfu.mongodb.net/bdGame?authSource=admin&replicaSet=atlas-rf5475-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true`
app.listen(port,()=>{
    mongoose.connect(`mongodb+srv://b24win:wJ3yJPZxjr9XuJh@cluster0.u7k3g.mongodb.net/b24win?authSource=admin&replicaSet=atlas-ls7wd9-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true`,{useNewUrlParser:true, useUnifiedTopology:true})
    // mongoose.connect(mongoURl,{useNewUrlParser:true, useUnifiedTopology:true})

})
