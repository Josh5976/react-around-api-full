require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
// const { allowedCors, DEFAULT_ALLOWED_METHODS } = require('./utils/cors');

const { requestLogger, errorLogger } = require('./middleware/logger');
const errorHandling = require('./middleware/error-handler');

const PORT = process.env.PORT || 3000;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/aroundb', {
  useNewUrlParser: true,
});

app.use(cors());
app.options('*', cors());

app.use(helmet);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(errorHandling);

app.listen(PORT);
