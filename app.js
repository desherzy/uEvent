require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const initializeDatabase = require('./dbInit');
const logger = require('morgan');
const bodyParser = require('body-parser');
const authRouter = require('./routes/authRoutes');

initializeDatabase();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', authRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}/`);
});

module.exports = app;