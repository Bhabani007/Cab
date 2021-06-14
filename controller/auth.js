const Register = require("../models/userRegister.js");
const jwt = require("jsonwebtoken");
const secret = "wheelBox";

module.exports = {
  login: (req, res) => {
    authenticate(req.body)
      .then((user) => {
        res.cookie("jwt", user.token, {
          expires: new Date(Date.now() + 300000),
          httpOnly: true,
        });
        user._doc.role === "admin"
          ? res.redirect("/dashboard")
          : res.redirect("/home");
      })
      .catch((err) => res.send(`error404.pug : ${err}`));
  },

  registerUser: async (req, res) => {
    const user = await Register.findOne({ email: req.body.email });
    if (!user) {
      var myData = new Register(req.body);
      myData
        .save()
        .then(() => {
          authenticate(myData)
            .then((user) => {
              res.cookie("jwt", user.token, {
                expires: new Date(Date.now() + 300000),
                httpOnly: true,
              });

              user._doc.role === "admin"
                ? res.redirect("/dashboard")
                : res.redirect("/home");
            })
            .catch((err) => res.json({ message: "some thing went wrong" }));
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    } else {
      res.send("User Exists");
    }
  },
};

const authenticate = async ({ email, password }) => {
  try {
    console.log("entered Authenticate");
    const user = await Register.findOne({ email });

    if (password === user.password) {
      const token = genToken(user);
      const { password, ...userWithoutPassword } = user;
      return {
        ...userWithoutPassword,
        token,
      };
    }
  } catch (error) {
    res.status(404).json({
      message: "Authentication Error",
    });
  }
};

const genToken = (user) => {
  const token = jwt.sign({ sub: user.id, role: user.role }, secret);
  return token;
};
