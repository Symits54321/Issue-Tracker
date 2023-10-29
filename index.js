const port = 8100;



// Requiring dependencies
const express = require('express');
const cookieParser=require('cookie-parser');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
//const session = require('express-session');
//const passport = require('passport');
//const passportLocal = require('./config/passport-local-strategy');
const path = require('path');





//SASS
const sassMiddleware =require('node-sass-middleware');

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
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


// ------- Middlewares

// EJS 
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));


// Session
/*
app.use(session({
  name: 'codeial',
  // TODO change the secret before deployment in production mode
  secret: 'blahsomething',
  saveUninitialized: false,
  resave: false,
  cookie: {
      maxAge: (1000 * 60 * 100)
  },
  store: new MongoStore(
      {
          uri: 'mongodb://127.0.0.1:27017/social_media9956',
          autoRemove: 'disabled'

      },
      function (err) {
          console.log(err || 'connect-mongodb setup ok');
      }
  )
}));
*/
  
  
  
  

// passport

// app.use(passport.initialize());
// app.use(passport.session());
// app.use(passport.setAuthenticatedUser);



//routes

app.use('/',require('./routes/index'));









// Listening
app.listen(port,function(err){
    if(err){
        console.log('not able to listen port');
    }
    console.log(`Issue Tracker is Listening to port:${port}`);
});




