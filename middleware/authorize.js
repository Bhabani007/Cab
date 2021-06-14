const jwt = require("jsonwebtoken");
const Register = require("../models/userRegister");
const secret = "wheelBox";

const userAuthorize = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const verifyUser = jwt.verify(token, secret);
    req.user = await Register.findOne({ _id: verifyUser.sub });
    next();
  } catch (error) {
    res.redirect("/login");
  }
};

const adminAuthorize = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const verifyUser = jwt.verify(token, secret);
    const user = await Register.findOne({ _id: verifyUser.sub });
    if (user.role === "admin") {
      next();
    } else
      res.status(404).json({
        message: "Access Denied- Admin Only",
      });
  } catch (error) {
    res.status(404).json({
      message: "Access Denied- Admin Only",
    });
  }
};

module.exports = { userAuthorize, adminAuthorize };
