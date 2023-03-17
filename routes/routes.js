const userRoute = require('./userRoutes');
const transactionRoute = require('./transactionRoute');
const adminRoute = require('./adminRoutes');
const gameRoute = require('./gameRoute');
const betRoute = require('./betRoute');
const clubRoute = require('./clubRoute');
const usersBetRoutes = require('./usersBetRoutes');
const balanceTransferRoutes = require('./balanceTransferRoutes');
const optionRoutes = require('./optionRoutes');


const routes = [
    {path:'/user', router: userRoute },
    {path:'/transaction',  router: transactionRoute},
    {path:'/admin', router: adminRoute},
    {path:'/game', router: gameRoute},
    {path:'/bet', router: betRoute},
    {path:'/club', router: clubRoute},
    {path:'/usersbet', router: usersBetRoutes},
    {path:'/transfer', router: balanceTransferRoutes},
    {path:'/option', router: optionRoutes},
];

const setRoutes = app =>{
    routes.forEach(route => {
        app.use(route.path, route.router)
    });
}

module.exports = setRoutes;
