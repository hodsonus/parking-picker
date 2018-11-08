module.exports = function () {
  var express = require('express');
  var bodyparser = require('body-parser');
  var morgan = require('morgan');
  var mongoose = require('mongoose');
  var apiRoutes = require('./endpoints');
  var path = require('path');

  var config = require('./config');
  mongoose.connect(config.mongo.url, { useNewUrlParser: true });

  var app = express();

  app.use(bodyparser.urlencoded({ extended: true }));
  app.use(bodyparser.json({ limit: '1mb' }));
  app.use(bodyparser.raw({ limit: '1mb' }));
  app.use(bodyparser.text({ limit: '1mb' }));

  app.use(morgan('combined', {}));

  // API routes
  app.use('/api', apiRoutes);

  app.use(express.static(path.join(__dirname, '../site')));

  app.listen(config.server.port);
  console.log(`Listening at port ${config.server.port}`);
}
