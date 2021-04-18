const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const port = 3000;
const cron = require('./schedule');
//passport
// const passport = require()


//create app
const app = express();

//cors config
app.use(cors())

//morgan
app.use(morgan('dev'))

//body-pareser config
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
require('dotenv').config()

//import connection to database
const connect = require('./database/connect');

//import routing
const todoAPI = require('./routes/todoAPI');
const userAPI = require('./routes/userAPI');
const userDetailsAPI = require('./routes/userDetailsAPI');
const tutorialAPI = require('./routes/tutorialAPI');
const tagAPI = require('./routes/tagAPI');
const mailAPI = require('./routes/mailAPI');
const uploadAPI = require('./routes/uploadAPI');
const authAPI = require('./routes/authAPI');
app.get('/', async (req, res) => {
  res.json({message: "Hello Moez"});
});

//use routing
app.use('/api/v1',todoAPI);
app.use('/api/v1',userAPI);
app.use('/api/v1',userDetailsAPI);
app.use('/api/v1',tutorialAPI);
app.use('/api/v1',tagAPI);
app.use('/api/v1',mailAPI);
app.use('/api/v1',uploadAPI);
app.use('/api/v1',authAPI);


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
