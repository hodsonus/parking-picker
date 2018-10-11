var express = require('express');
var createUser = require('./user/create');
var helloWorld = require('./helloWorld');
var secure = require('../middleware/secure');

var router = express.Router();

router.post('/user', createUser);
router.get('/', secure, helloWorld);

module.exports = router;
