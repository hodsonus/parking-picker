var express = require('express');
var bodyparser = require('body-parser');
var morgan = require('morgan');

var auth = require('./middleware/auth');
var apiRoutes = require('./endpoints');

var config = require('./config');

var app = express();

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json({ limit: '1mb' }));
app.use(bodyparser.raw({ limit: '1mb' }));
app.use(bodyparser.text({ limit: '1mb' }));

app.use(morgan('combined', {}));

// API routes
app.use('/api', auth, apiRoutes);
app.use(express.static('../site'));

app.listen(config.server.port);
