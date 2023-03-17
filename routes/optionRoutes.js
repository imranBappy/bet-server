const router = require('express').Router();
const isAuthenticated = require('../middlewares/isAuthenticated');

const {
    newPostController,
    newGetController,
    numberPostController,
    numberGetController,
    numberDeleteController,
    rateUpdateController,
    rateGetController
 } = require('../controllers/optionsController');



router.post('/news', isAuthenticated, newPostController );
router.get('/news' ,  newGetController );

router.post('/number', isAuthenticated, numberPostController );
router.get('/number' ,isAuthenticated,  numberGetController );
router.delete('/number' ,isAuthenticated,  numberDeleteController );

router.patch('/rate' ,isAuthenticated,  rateUpdateController );
router.get('/rate' ,isAuthenticated,  rateGetController );





module.exports = router