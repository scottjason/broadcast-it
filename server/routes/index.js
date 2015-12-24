var express = require('express');
var router = express.Router();
var controller = require('../controllers/index.js');

router.get('/', controller.renderIndex);
router.get('/create', controller.createBroadcast);

module.exports = router;
