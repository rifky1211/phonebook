var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var firebase = require("firebase")
const {graphqlHTTP} = require("express-graphql");
const cors = require("cors");

const config = {
    apiKey: "AAAADPRzXYc:APA91bF0FJBIeY_FpiLjmNT9mXCUJldMWanNNFk7--aeqfenT77ELq6YdqGw0Prype0AzsKQSZsooN4r8Iw9ii82U1stluxKaY5KG1OU72-9WETBktDLNc6elEj-Eiipt8LefbPW9JQf",
    authDomain: "phonebook-rifky.firebaseapp.com",
    databaseURL: "https://phonebook-rifky-default-rtdb.firebaseio.com/",
    projectId: "phonebook-rifky",
    storageBucket: "phonebook-rifky.appspot.com",
    messagingSenderId: "55640808839"
  };
firebase.initializeApp(config);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/phonebook', apiRouter);

const contactSchema = require('./graphql').contactSchema;
app.use('/graphql', cors(), graphqlHTTP({
  schema: contactSchema,
  rootValue: global,
  graphiql: true
}));

module.exports = app;
