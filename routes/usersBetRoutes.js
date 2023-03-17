const router = require('express').Router();
const { 
    betPostController , 
    betGetController,
    userBetStatusUpdateController,
    userBetGetController,
    userClubBetGetController
} = require('../controllers/usersBetController');
const isAuthenticated = require('../middlewares/isAuthenticated');

router.post('/adduserbet',isAuthenticated, betPostController)
router.get('/', isAuthenticated, betGetController);
router.patch('/result-status-update', isAuthenticated, userBetStatusUpdateController);
router.get(`/user-bet-get`, isAuthenticated, userBetGetController)
router.get(`/club-bet-get`, isAuthenticated, userClubBetGetController)



module.exports = router