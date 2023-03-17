const { 
    transactionPortController,
    transactionGetController,
    transactionUpdateController
} = require('../controllers/transactionController');
const isAuthenticated = require('../middlewares/isAuthenticated');
const router = require('express').Router();

router.post('/add', isAuthenticated, transactionPortController )
router.get('/', transactionGetController )
router.patch('/update-transaction/:trxId', isAuthenticated, transactionUpdateController)
module.exports = router;
