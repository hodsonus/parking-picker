var mongoose = require('mongoose');
var express = require('express');
var bodyparser = require('body-parser');
var auth = require('./middleware/auth');

var app = express();

express.use(bodyparser.urlencoded());
express.use(bodyparser.json());
express.use(bodyparser.raw());
express.use(bodyparser.text());

express.use(auth);
