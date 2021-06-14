const Getacab = require("../models/getacab");

module.exports = {
  approveBooking: async (req, res) => {
    const booking = await Getacab.get.findByIdAndUpdate(
      req.query.id,
      { status: true },
      function (err, data) {
        if (err) throw err;
        else console.log("updated data : ", data);
      }
    );
    var transporter = Nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "bscitm5thsem@gmail.com",
        pass: "@itm6thsem",
      },
    });

    var mailOptions = {
      from: "bscitm5thsem@gmail.com",
      to: booking.email,
      subject: `Wheelbox response`,
      text: `Dear Sir/Ma'am
            Your request has been accepted `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email has been sent: " + info.response);
      }
    });
    // console.log(booking);
    res.redirect("/bookingrequest");
  },

  rejectBooking: async (req, res) => {
    console.log(req.query.id);
    const booking = await Getacab.get.findByIdAndUpdate(
      req.query.id,
      { status: false },
      function (err, data) {
        if (err) throw err;
        else console.log("updated data : ", data);
      }
    );
    var transporter = Nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "bscitm5thsem@gmail.com",
        pass: "@itm6thsem",
      },
    });

    var mailOptions = {
      from: "bscitm5thsem@gmail.com",
      to: booking.email,
      subject: "WheelBox Response",
      text: `Dear Sir/Ma'am 
            Your request has been rejected due to the unavailability of cabs`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email has been sent: " + info.response);
      }
    });
    // console.log(booking);
    res.redirect("/bookingrequest");
  },
};
