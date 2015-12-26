var express = require('express');
var router = express.Router();
var controller = require('../controllers/index.js');

router.get('/', controller.renderIndex);
router.get('/create', controller.createSession);
router.get('/subscriber/:sessionId', controller.joinBroadcast);
router.post('/shortUrl', controller.generateShortUrl);
router.get('/*', controller.redirect);

module.exports = router;
