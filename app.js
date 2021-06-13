const express = require("express");
const path = require("path");
const fs = require('fs');
const Nodemailer = require('nodemailer')
const Contact = require('./models/contact')
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
// const Register = require("./models/userRegister");
const { request } = require("http");
const { response } = require("express");
const Location = require("./models/location");
const Getacab = require("./models/getacab");
const Car = require("./models/car");
const { registerUser, login } = require("./controller/auth");
const { rejectBooking, approveBooking } = require("./controller/booking");
const { postContact, postGetaCab } = require("./controller/post_function");
mongoose.connect('mongodb://localhost/Cab', { useNewUrlParser: true, useUnifiedTopology: true });
const app = express();
const port = 80;


app.use('/static', express.static('static'))
app.use(express.urlencoded())



//PUG SPECIFIC STUFF
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

// GET REQUEST
app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('index.pug', params);
});

app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).render('contact.pug', params);
});

app.get('/register', (req, res) => {
    const params = {}
    res.status(200).render('register.pug', params);
});
app.get('/login', (req, res) => {
    const params = {}
    res.status(200).render('login.pug', params);
});
app.get('/about', (req, res) => {
    const params = {}
    res.status(200).render('about.pug', params);
});
app.get('/fares', (req, res) => {
    const params = {}
    res.status(200).render('fares.pug', params);
});


// authentication

// user
app.get('/home', (req, res) => {
    const params = {}
    res.status(200).render('home.pug', params);
});
app.get("/getacab", function(req, res) {
    Location.fetchData(function(data) {
        console.log(data);
        res.render('getacab.pug', { locationList: data });
    });
});

// admin

app.get('/dashboard', (req, res) => {
    const params = {}
    console.log('user', user);
    res.status(200).render('dashboard.pug', params);
});
app.get('/cardetails', function(req, res) {
    Car.fetchData(function(data) {
        res.status(200).render('cardetails.pug', { carList: data });
    });
});
app.get('/driverdetails', (req, res) => {
    const params = {}
    res.status(200).render('driverdetails.pug', params);
});

app.get("/bookingrequest", function(req, res) {
    Getacab.fetchData(function(data) {
        // console.log(data);
        res.render('bookingreq.pug', { getacabList: data });
    });
});


app.get("/booking/approve", approveBooking);

app.get("/booking/reject", rejectBooking);


// POST REQUEST

app.post('/contact', postContact);
app.post("/register", registerUser);
app.post("/login", login);

// user
app.post("/getacab", postGetaCab);






app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});