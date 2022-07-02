const express= require("express")
const bodyParser= require("body-parser")
const mongoose= require("mongoose")
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User= require("./models/user")

const {PORT, mongoURI} = require("./config/keys")
const authRouter = require("./routes/index")

const app=express()

app.use(bodyParser.urlencoded({extended: true}))

app.set("view engine", "ejs")

app.use(express.static(__dirname))

mongoose.connect(mongoURI)

app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use("/", authRouter)


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})