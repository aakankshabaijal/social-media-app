const express = require('express');
const router = express.Router();
console.log('using express router');

const homeController = require('../controllers/home_controller');

router.get('/', homeController.home);
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));

//for any further routes, add them here

module.exports = router;
