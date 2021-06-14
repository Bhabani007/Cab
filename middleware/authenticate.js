const Register = require("../models/userRegister");
const jwt = require("jsonwebtoken");
const secret = "wheelBox";

module.exports = {
  authenticate: async ({ email, password }) => {
    try {
      const user = await Register.findOne({ email });

      if (password === user.password) {
        const token = jwt.sign({ sub: user.id, role: user.role }, secret);
        const { password, ...userWithoutPassword } = user;
        return {
          ...userWithoutPassword,
          token,
        };
      }
    } catch (error) {
        res.status(404).json({
            message : 'Authentication Error'
        })
    }
  },
};
