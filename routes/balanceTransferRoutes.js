const router = require('express').Router()
const { 
    balanceTransferPostController,
    balanceTransferGetController
} = require('../controllers/BalanceTransferController');
const isAuthenticated = require('../middlewares/isAuthenticated');

router.post('/post', isAuthenticated, balanceTransferPostController)
router.get('/get-transfer', isAuthenticated, balanceTransferGetController)
module.exports = router