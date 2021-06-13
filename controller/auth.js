const Register = require('../models/userRegister');

module.exports = {
    login: async(req, res) => {
        console.log("success enetered");
        try {
            const request = req.body;
            const email = req.body.email;
            const password = req.body.password;


            const user = await Register.findOne({ email: email });

            console.log(req.body);
            if (email === user.email && password === user.password) {
                switch (user.role) {
                    case "admin":
                        res.render("dashboard.pug")
                        break;

                    case ("user"):
                        res.render("home.pug");
                        break;

                    default:
                        break;
                }
            } else { res.render("error404.pug"); }

        } catch (err) {
            res.render("error404.pug");
        }
    },

    registerUser: async(req, res) => {
        const user = await Register.findOne({ email: req.body.email });
        if (!user) {
            var myData = new Register(req.body);
            myData
                .save()
                .then(() => {
                    res.render("login.pug");
                })
                .catch((err) => {
                    res.status(400).send(err);
                });
        } else {
            res.send("User Exists");
        }
    }
}