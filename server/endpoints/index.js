var express = require('express');
// var helloWorld = require('./helloWorld');
var getLots = require('./lot/getLots');
var getScooters = require('./lot/getScooterLots');
var submitFullness = require('./lot/submitFullness');
var getBuildings = require('./buildings/getBuildings');

var router = express.Router();

router.post('/lots/fullness', submitFullness);
router.get('/lots', getLots);
router.get('/scooters', getScooters);
router.get('/buildings', getBuildings);

module.exports = router;
