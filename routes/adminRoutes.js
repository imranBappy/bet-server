const { adminPostController, adminGetController,adminDeleteController, adminPutController, adminPostLoginController, singleAdminGetController } = require('../controllers/adminController')
const { dashboardGetController } = require('../controllers/dashboard')
const isAuthenticated = require('../middlewares/isAuthenticated')

const router = require('express').Router()

router.get('/', isAuthenticated, dashboardGetController )
router.post('/add', isAuthenticated, adminPostController )
router.post('/login', adminPostLoginController )
router.get('/all-admin',isAuthenticated,  adminGetController )
router.get('/single-user/:userId',isAuthenticated, singleAdminGetController )
router.put('/change',isAuthenticated, adminPutController )
router.delete('/delete',isAuthenticated, adminDeleteController )




module.exports = router