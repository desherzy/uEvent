require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const initializeDatabase = require('./dbInit');
const logger = require('morgan');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const companyRouter = require('./routes/companyRoutes');

initializeDatabase();

const app = express();


const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
};

app.use(cors(corsOptions));


app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
app.use(cookieParser());
app.use(fileUpload());
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/company', companyRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}/`);
});

module.exports = app;