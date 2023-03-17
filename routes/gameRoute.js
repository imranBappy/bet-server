const { 
    gamePostController, 
    gameGetController, 
    gameAllDeleteController ,
    gameUpdateController,
    allGameLoadGetController,
    singleGameGetController
} = require('../controllers/gameController');
const isAuthenticated = require('../middlewares/isAuthenticated');
const router = require('express').Router()

router.post('/add', isAuthenticated, gamePostController )
router.get('/get-all', isAuthenticated, gameGetController )
router.get('/get-game', allGameLoadGetController )
router.get('/single/:id', isAuthenticated, singleGameGetController)
router.patch('/game-update', isAuthenticated, gameUpdateController)
router.delete('/delete-all',isAuthenticated, gameAllDeleteController)




module.exports = router;