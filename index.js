//require dotenv
const dotenv = require('dotenv').config();

const port = 8100;

// Requiring dependencies
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const path = require('path');

// cors 
var whitelist = ['https://issue-tracker-symits.onrender.com']
var corsOptions = {
  origin: function (origin, callback) {
    console.log("origin received : "+origin);
    if (whitelist.indexOf(origin) !== -1) {
          var isAllowed = whitelist.some(url => {
            return origin && origin.startsWith(url); // Checks if the origin starts with a whitelisted domain
          });
      
          if (isAllowed) {
            callback(null, true);  // Allow the request
          } else {
            callback(new Error('Not allowed by CORS'));  // Reject the request
          }
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions));

//SASS
const sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware({
  src: './assets/scss',
  dest: './assets/css',
  debug: true,
  outputStyle: 'extended',
  prefix: '/css'
}));

//Parsers
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

//static files including
app.use(express.static('assets'));

//layout
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// ------- Middlewares

// EJS 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



app.use((err, req, res, next) => {
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ message: 'Forbidden: CORS policy blocked the request' });
  }
  next(err);
});

//routes
app.use('/', require('./routes/index'));

// Listening
app.listen(port, function (err) {
  if (err) {
    console.log('not able to listen port');
  }
  console.log(`Issue Tracker is Listening to port: ${port}`);
});
