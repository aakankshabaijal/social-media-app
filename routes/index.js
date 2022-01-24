const express = require('express');
const router = express.Router();
console.log('using express router');

const homeController = require('../controllers/home_controller');

router.get('/', homeController.home);
router.get('/credits', homeController.credits);

router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));
router.use('/likes', require('./likes'));

//for any further routes, add them here
router.use('/api', require('./api'));

module.exports = router;
