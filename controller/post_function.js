const Getacab = require('../models/getacab');
const Contact = require('../models/contact');
module.exports = {
    postContact: (req, res) => {
        var myData = new Contact(req.body)
        myData.save().then(() => {

            res.render("contact.pug")
        }).catch((err) => {
            res.status(400).send(err)
        });
    },

    postGetaCab: (req, res) => {
        var myBooking = new Getacab.get(req.body);
        console.log(myBooking);
        myBooking.save();

        Location.fetchData(function(data) {
            // console.log(data);
            res.render('getacab.pug', { locationList: data });
        });
    }
}