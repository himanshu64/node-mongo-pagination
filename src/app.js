const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
const timeout = require('connect-timeout');
const httpStatus = require('http-status');
const config = require('./config/config');
const morgan = require('./config/morgan');
// const corsOptions = require('./config/corsoptions');
const routes = require('./routes/v1');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');

const app = express();

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// request timeout
app.use(timeout('60s'));

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
// app.options('*', cors(corsOptions));

// v1 api routes
app.use('/api/v1', routes);

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  console.log(req.url);
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
