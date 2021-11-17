const express = require('express');
const router = express.Router();
console.log('using express router');

const homeController = require('../controllers/home_controller');

router.get('/', homeController.home);

module.exports = router;
