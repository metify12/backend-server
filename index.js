const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDB = require('./config/db');

// load env variables
dotenv.config({ path: '.env' });

// connect to database
connectDB();

const app = express();

// middleware setup
app.use(express.json()); // body parser

// mount router
const auth = require('./routes/auth');

app.use('/api/v1/auth', auth)

// app.get('/', (req, res) => {
//   res.send('hello world');
// });

//
const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
