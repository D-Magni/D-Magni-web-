const express = require('express');
const session = require('express-session');
const crypto = require('crypto');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');

const errorMiddleware = require('./middlewares/errors');
const secretKey = crypto.randomBytes(32).toString('hex');


if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 'server/config/config.env' })


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

if (process.env.NODE_ENV === 'PRODUCTION') {
  app.use(express.static(path.join(__dirname, '../client/build')))

  app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, '../client/build/index.html'))
  })
}


module.exports = app