//dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
require('dotenv').config();
const connectionDb = require('./config/dbConnection')

// app port const 
app = express();
const port = 3030;

// get mongo db uri from .env file
const uri = process.env.uri;
connectionDb(uri)


// open a port for listening 
app.listen(port, () => {
    console.log('Server is listening on port:', port);
  });
  