const Getacab = require("../models/getacab");
const Contact = require("../models/contact");
const Location = require("../models/location");
module.exports = {
  postContact: (req, res) => {
    var myData = new Contact(req.body);
    myData
      .save()
      .then(() => {
        res.render("contact.pug");
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  },

  postGetaCab: (req, res) => {
    var data = req.body;
    var updatedData = {
      ...data,
      email: req.user.email,
    };
    var myBooking = new Getacab.get(updatedData);
    myBooking.save();
    Location.fetchData(function (data) {
      res.render("getacab.pug", { locationList: data });
    });
  },
};
