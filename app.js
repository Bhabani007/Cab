const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const fs = require("fs");
const Nodemailer = require("nodemailer");
const Contact = require("./models/contact");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
// const Register = require("./models/userRegister");
const { request } = require("http");
const { response } = require("express");
const Location = require("./models/location");
const Getacab = require("./models/getacab");
const Car = require("./models/car");
const { registerUser, login } = require("./controller/auth");
const { rejectBooking, approveBooking } = require("./controller/booking");
const { postContact, postGetaCab } = require("./controller/post_function");
const { userAuthorize, adminAuthorize } = require("./middleware/authorize");
const { verifyUser } = require("./middleware/verifyUser");
mongoose.connect("mongodb://localhost/Cab", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const app = express();
const port = 80;

app.use("/static", express.static("static"));
app.use(express.urlencoded());
app.use(cookieParser());

//PUG SPECIFIC STUFF
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// GET REQUEST
app.get("/", verifyUser, (req, res) => {
  const params = {};
  res.status(200).render("index.pug", params);
});

app.get("/contact", (req, res) => {
  const params = {};
  res.status(200).render("contact.pug", params);
});

app.get("/register", verifyUser, (req, res) => {
  const params = {};
  res.status(200).render("register.pug", params);
});
app.get("/login", verifyUser, (req, res) => {
  const params = {};
  res.status(200).render("login.pug", params);
});
app.get("/about", (req, res) => {
  const params = {};
  res.status(200).render("about.pug", params);
});
app.get("/fares", (req, res) => {
  const params = {};
  res.status(200).render("fares.pug", params);
});

// authentication
app.get("/logout", (req, res) => {
  res.clearCookie('jwt');
  console.log("log out");
  res.redirect("/");
});

// user
app.get("/home", userAuthorize, (req, res) => {
  console.log("req. user : ----", req.user);
  res.status(200).render("home.pug", { user: req.user });
});
app.get("/getacab", userAuthorize, function (req, res) {
  Location.fetchData(function (data) {
    res.render("getacab.pug", { locationList: data, user: req.user });
  });
});

// admin

app.get("/dashboard", adminAuthorize, (req, res) => {
  const params = {};
  res.status(200).render("dashboard.pug", params);
});
app.get("/cardetails", adminAuthorize, function (req, res) {
  Car.fetchData(function (data) {
    res.status(200).render("cardetails.pug", { carList: data });
  });
});
app.get("/driverdetails", adminAuthorize, (req, res) => {
  const params = {};
  res.status(200).render("driverdetails.pug", params);
});

app.get("/bookingrequest", adminAuthorize, function (req, res) {
  Getacab.fetchData(function (data) {
    res.render("bookingreq.pug", { getacabList: data });
  });
});

app.get("/booking/approve", adminAuthorize, approveBooking);

app.get("/booking/reject", adminAuthorize, rejectBooking);

// POST REQUEST

app.post("/contact", postContact);
app.post("/register", registerUser);
app.post("/login", login);

// user
app.post("/getacab", userAuthorize, postGetaCab);

app.listen(port, () => {
  console.log(`The application started successfully on port ${port}`);
});
