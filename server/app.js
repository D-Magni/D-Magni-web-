const express = require('express');
const session = require('express-session');
const crypto = require('crypto');
const app = express();

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
// const dotenv = require('dotenv');
// const path = require('path')

const errorMiddleware = require('./middlewares/errors');
const secretKey = crypto.randomBytes(32).toString('hex');


app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(fileUpload());
app.use(session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
  }));
  


//Import all routes

const products = require('./routes/product');
const auth = require('./routes/auth');
const cart = require('./routes/cart');
const order = require('./routes/order');
const payment = require('./routes/payment');


app.use('/api/v1', products);
app.use('/api/v1', auth);
app.use('/api/v1', cart);
app.use('/api/v1', payment)
app.use('/api/v1', order);

//Middleware to handle errors
app.use(errorMiddleware);

module.exports = app