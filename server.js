const express=require('express');
const app=express();
const connect= require('./server/db/connect.js');
const bodyparser=require('body-parser');
const session=require('express-session');
const path=require('path');
const dotenv = require('dotenv');
const passport=require('passport');
const flash=require('express-flash');

module.exports=passport;

dotenv.config( { path : 'config.env'} )
connect();

const PORT = process.env.PORT || 800;

app.use(bodyparser.urlencoded({ extended : true}));
app.use(express.json());
app.set("view engine", "ejs")
app.use(session({secret: 'mySecret', resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());

app.use(flash())
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});


app.use('/css', express.static(path.resolve(__dirname, "frontend/css")));
app.use('/js', express.static(path.resolve(__dirname, "frontend/js")));
app.use('/img', express.static(path.resolve(__dirname, "frontend/img")));

app.use('/',require('./server/api/routes.js'))

app.listen(PORT,()=>console.log("connected to server"))





