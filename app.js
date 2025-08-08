const express = require('express');
const app = express();

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const morgan = require('morgan');

//! 1. MIDDLEWARES
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.requestTime);
  next();
});

app.use((req, res, next) => {
  console.log('Hello from the middleware 👋');
  next();
});

//! 3.  ROUTES

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//! 4.  START THE SERVER
module.exports = app;
