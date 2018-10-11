var express = require('express');
var createUser = require('./user/create');
var helloWorld = require('./helloWorld');

var router = express.Router();

router.post('/user', createUser);
router.get('/', helloWorld);

module.exports = router;
