const router = require('express').Router();
const isAuthenticated = require('../middlewares/isAuthenticated');
const {
    clubPortController,
    rankingClubGetController,
    clubGetController,
    clubUpdatePutController,
    singleClub
 } = require('../controllers/clubController');



router.post('/add-club', isAuthenticated, clubPortController );
router.get('/get-ranking-club', rankingClubGetController );
router.get('/get-all-club', clubGetController );
router.get('/:id', singleClub );

router.put('/update', isAuthenticated, clubUpdatePutController );


module.exports = router