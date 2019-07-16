const express = require('express');
const http = require('http');
const path = require('path');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const _ = require('lodash');
const mongoClient = require('mongodb').MongoClient;

const serverConfig = require('./configs/server');
const userController = require('./controllers/user');

mongoClient.connect(serverConfig.connectionString, (err, db) => {
  if (err || !db) {
    console.error('Connected to db with some problems');
  } else {
    global.DB = db.db();
    console.log('Connected to db successfully');
  }
}); 

const app = express();
app.use(helmet());
app.use(bodyParser.json());

app.all('*', async (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Authorization, Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  const token = req.headers.authorization;
  if (token) {
    try { 
      req.user = await userController.authorize(token);
    } catch(error) {}
  }

  next();
});

// Version controll
app.use('/v1', require('./routes/v1'));

// Invalid routes
app.use((req, res) => {
  res.status(404).send('Oops! This is not the web page you are looking for.');
});

// Simple error handling
app.use((err, req, res, next) => {
  console.error('error handling', err.message);
  const errorResponse = {
    message: _.isString(err) ? err : err.message || 'Something went wrong'
  }
  res.status(404).send(errorResponse);
});

// Starting the server.
const httpServer = http.createServer(app);
httpServer.listen(serverConfig.port, () => {
  console.log('API server is running on port ' + serverConfig.port + '.');
});