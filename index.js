//dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const connectionDb = require('./config/dbConnection')
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')


// app port const 
app = express();
const port = 3030;
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(bodyparser.json());
app.use(cors());

// get mongo db uri from .env file
const uri = process.env.uri;
connectionDb(uri)


// routes

app.use('/auth',authRoutes);
app.use('/user',userRoutes);
app.use('/post',postRoutes);




// open a port for listening 
app.listen(port, () => {
    console.log('Server is listening on port:', process.env.port);
  });
  