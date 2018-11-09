var express = require('express');
// var helloWorld = require('./helloWorld');
var getLots = require('./lot/getLots');
var submitFullness = require('./lot/submitFullness');

var router = express.Router();

router.post('/lots/fullness', submitFullness);
router.get('/lots', getLots);

module.exports = router;
