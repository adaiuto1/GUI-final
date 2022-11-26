require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const { log, ExpressAPILogMiddleware } = require('@rama41222/node-logger');

// const mysqlConnect = require('./db');
//this is all trying to work with knex based on the base given from lab
const routes = require('./routes');
const { createModelsMiddleware  } = require('./middleware/model-middleware' );

// set up some configs for express.
const config = {
  host: process.env.MYSQL_CLOUD_HOST,
  port: process.env.MYSQL_PORT,
  name: 'roommate-finder-express-app',
  
};

// create the express.js object,  I guess this is the app? 
const app = express();

// create a logger object.  Using logger is preferable to simply writing to the console.
const logger = log({ console: true, file: false, label: config.name });

// specify middleware to use
app.use(bodyParser.json());
app.use(createModelsMiddleware);
app.use(cors({
  origin: '*'
}));
app.use(ExpressAPILogMiddleware(logger, { request: true }));

//include routes
routes(app, logger);

// connecting the express object to listen on a particular port as defined in the config object.
app.listen(config.port, config.host, (e) => {
  if (e) {
    throw new Error('Internal Server Error');
  }
  logger.info(`${config.name} running on ${config.host}:${config.port}`);
});


