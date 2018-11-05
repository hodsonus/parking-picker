var express = require('express');
var createUser = require('./user/create');
var helloWorld = require('./helloWorld');
var getLots = require('./lot/getLots');

var secure = require('../middleware/secure');

var router = express.Router();

router.post('/user', createUser);
router.get('/', secure, helloWorld);
router.get('/lots', getLots);

module.exports = router;
