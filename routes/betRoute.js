const { 
    betTitlePostController, 
    resultAddPostController, 
    allBetGetController ,
    titleAllDeleteController, 
    betAllDeleteController, 
    singleBetGetController,
    resultUpdateController,
    betSingleGetController,
    betUpdateController
} = require('../controllers/betController')
const isAuthenticated = require('../middlewares/isAuthenticated')
const router = require('express').Router()

router.post('/post-title', isAuthenticated, betTitlePostController,  );
router.post('/add-bet', isAuthenticated, resultAddPostController);
router.get('/get-all-bet', isAuthenticated, allBetGetController);
router.get('/get-single-bet', isAuthenticated, singleBetGetController );
router.get('/single-bet-get', isAuthenticated, betSingleGetController );
router.delete('/title-all-delete', titleAllDeleteController)
router.delete('/delete-all-bet', betAllDeleteController)
router.put('/result-update', isAuthenticated, resultUpdateController );
router.put('/bet-update', isAuthenticated, betUpdateController );

module.exports = router